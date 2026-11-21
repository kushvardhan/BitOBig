import createContainer from "./containerFactory";
import { CPP_IMAGE } from "../utils/constants";
import decodeBuffer from "./dockerHelper";
import type { CodeExecuterStrategy } from "../interface/CodeExecuterStrategy";

class CppExecuter implements CodeExecuterStrategy {

    async execute(
        code: string,
        inputTestCase: string
    ): Promise<string> {

        const rawLogBuffer: Buffer[] = [];

        console.log(
            "Creating C++ Docker Container...for this code:",
            code
        );

        // safer escaping
        const escapedCode = code.replace(/'/g, `'\\''`);
        const escapedInput = inputTestCase.replace(/'/g, `'\\''`);

        const runCommand = `
echo '${escapedCode}' > Main.cpp &&

timeout 10s g++ -o Main Main.cpp &&

timeout 5s ./Main << 'EOF'
${escapedInput}
EOF
`;

        const cppDockerContainer = await createContainer(
            CPP_IMAGE,
            [
                "/bin/sh",
                "-c",
                runCommand,
            ]
        );

        await cppDockerContainer.start();

        console.log("C++ Docker Container Started");

        const loggerStream = await cppDockerContainer.logs({
            follow: true,
            stdout: true,
            stderr: true,
            timestamps: false,
        });

        loggerStream.on("data", (chunk) => {
            rawLogBuffer.push(chunk);
        });

        const codeResponse: string =
            await new Promise<string>((resolve, reject) => {

                const timer = setTimeout(async () => {
                    try {
                        console.log(
                            "Execution timeout reached. Killing C++ container..."
                        );

                        await cppDockerContainer.kill();
                    } catch {}

                    reject(
                        new Error(
                            "Execution timed out after 10 seconds"
                        )
                    );
                }, 10000);

                loggerStream.on("end", () => {

                    clearTimeout(timer);

                    const completeBuffer =
                        Buffer.concat(rawLogBuffer);

                    const decodedStream =
                        decodeBuffer(completeBuffer);

                    console.log(
                        "decodedOutput:",
                        decodedStream
                    );

                    if (decodedStream.stderr) {
                        reject(decodedStream.stderr);
                    } else {
                        resolve(decodedStream.stdout);
                    }
                });

                loggerStream.on("error", (err) => {
                    clearTimeout(timer);
                    reject(err);
                });
            });

        try {
            await cppDockerContainer.remove({
                force: true,
            });
        } catch {}

        return codeResponse;
    }
}

export default CppExecuter;