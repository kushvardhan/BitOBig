import createContainer from "./containerFactory";
import { CPP_IMAGE } from "../utils/constants";
import decodeBuffer from "./dockerHelper";
import CodeExecuterStrategy from "../interface/CodeExecuterStrategy";

class CppExecuter implements CodeExecuterStrategy{
    async execute(code: string, inputTestCase: string): Promise<string> {
        const rawLogBuffer: Buffer[]=[];

        console.log("Creating C++ Docker Conatiner... for this code: ", code);

        const escapedCode = code.replace(/'/g, `'\\''`);
        const escapedInput= inputTestCase.replace(/'/g, `'\\''`);

        const runCommand = `
        echo '${escapedCode}' > Main.cpp &&

        timeout 10s g++ -o Main Main.cpp &&

        timeout 5s ./Main << 'EOF'
        ${escapedInput}
        EOF 
        `;

        const cppDockerConatiner = await createContainer(
            CPP_IMAGE,
            [
                "/bin/sh",
                "-c",
                runCommand,
            ]
        );

        await cppDockerConatiner.start();
        console.log("C++ Docker Conatiner Started");

        const loggerStream = await cppDockerConatiner.logs({
            follow:true,
            stdout:true,
            stderr:true,
            timestamps: false,
        });

        const codeResonse: string = await new Promise<string>((resolve, reject)=>{
            const timer = setTimeout(async ()=>{
                try{

                }catch{}
                reject(
                    new Error(
                        "Execution timed out after 10 seconds"
                    )
                );
            }, 10000);

            loggerStream.on("end",()=>{
                clearTimeout(timer);
                const completeBuffer=Buffer.concat(rawLogBuffer);
                const decodedStream= decodeBuffer(completeBuffer);
                console.log("decodeOutput: ", decodedStream);
                if(decodedStream.stderr){
                    reject(decodedStream.stderr);
                }else{
                    resolve(decodedStream.stdout);
                }
            });

            loggerStream.on("error",(err)=>{
                clearTimeout(timer);
                reject(err);
            });
        });

        try{
            await cppDockerContainer.remove({
                force:true,
            });
        }catch{}
        return codeResponse;
    }
}

export default CppExecuter;