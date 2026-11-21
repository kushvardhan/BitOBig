import createContainer from "./containerFactory";
import { JAVA_IMAGE } from "../utils/constants";
import decodeBuffer from "./dockerHelper";
import type { CodeExecuterStrategy } from "../interface/CodeExecuterStrategy";

class JavaExecuter implements CodeExecuterStrategy {

    async execute(
        code: string,
        inputTestCase: string
    ): Promise<string> {

        const rawLogBuffer: Buffer[] = [];

        console.log(
            "Creating Java Docker Container...for this code:",
            code
        );

        const escapedCode = code.replace(/'/g, `'\\''`);
        const escapedInput = inputTestCase.replace(/'/g, `'\\''`);

        const runCommand = `
echo '${escapedCode}' > Main.java &&

timeout 10s javac Main.java &&

timeout 5s java Main << 'EOF'
${escapedInput}
EOF
`;

        const javaDockerContainer = await createContainer(
            JAVA_IMAGE,
            [
                "/bin/sh",
                "-c",
                runCommand,
            ]
        );

        await javaDockerContainer.start();

        console.log("Java Docker Container Started");

        const loggerStream = await javaDockerContainer.logs({
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
                            "Execution timeout reached. Killing Java container..."
                        );

                        await javaDockerContainer.kill();
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
            await javaDockerContainer.remove({
                force: true,
            });
        } catch {}

        return codeResponse;
    }
}

export default JavaExecuter;