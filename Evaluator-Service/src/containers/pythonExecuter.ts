// runPython.ts

import createContainer from "./containerFactory";
import { PYTHON_IMAGE } from "../utils/constants";
import decodeBuffer from "./dockerHelper";
import type { CodeExecuterStrategy } from "../interface/CodeExecuterStrategy";

class PythonExecuter implements CodeExecuterStrategy{

    async execute(
    code: string,
    inputTestCase: string
    ): Promise<string> {
        
         const rawLogBuffer: any[] = [];

    console.log(
        "Creating Python Docker Container...for this code: ",
        code
    );

    // safer escaping
    const escapedCode = code.replace(/'/g, `'\\''`);
    const escapedInput = inputTestCase.replace(/'/g, `'\\''`);

    const runCommand = `
echo '${escapedCode}' > test.py &&
timeout 5s python test.py << 'EOF'
${escapedInput}
EOF
`;

    const pythonDockerContainer = await createContainer(
        PYTHON_IMAGE,
        [
            "/bin/sh",
            "-c",
            runCommand,
        ]
    );

    await pythonDockerContainer.start();

    console.log("Python Docker Container Started");

    const loggerStream = await pythonDockerContainer.logs({
        follow: true,
        stdout: true,
        stderr: true,
        timestamps: false,
    });

    loggerStream.on("data", (chunk) => {
        rawLogBuffer.push(chunk);
    });

    const codeResponse:string = await new Promise((resolve, reject) => {

        // hard kill after 5 seconds
        const timer = setTimeout(async () => {
            try {
                console.log("Execution timeout reached. Killing container...");
                await pythonDockerContainer.kill();
            } catch {}

            reject(new Error("Execution timed out after 5 seconds"));
        }, 5000);

        loggerStream.on("end", () => {
            clearTimeout(timer);

            const completeBuffer = Buffer.concat(rawLogBuffer);

            const decodedStream = decodeBuffer(completeBuffer);

            console.log("decodedOutput:", decodedStream);

            if(decodedStream.stderr){
                reject(decodedStream.stderr);
            }
            else{
                resolve(decodedStream.stdout);
            }
        });

        loggerStream.on("error", (err) => {
            clearTimeout(timer);
            reject(err);
        });
    });

    try {
        await pythonDockerContainer.remove({ force: true });
    } catch {}

    return codeResponse;

    }
}

export default PythonExecuter;