import Docker from "dockerode";
import type { Readable } from "stream";

const docker = new Docker();

async function pullImageIfNotExists(imageName:string){
    try{

    }catch(err){
        console.log(`Pulling image ${imageName}...`);

        await new Promise((resolve, reject)=>{
            docker.pull(
                imageName,
                (err:Error | null, stream: Readable)=>{
                    if(err){
                        return reject(err);
                    }
                    docker.modem.followProgress(
                        stream, 
                        (err:Error | null, output:unknown)=>{
                            if(err){
                                reject(err);
                            }else{
                                resolve(output);
                            }
                        }
                    );
                }
            )
        })

        console.log(`Image ${imageName} pulled successfully`);
    }
}


async function createContainer(imageName: string, cmdExecutable:string[]){
    await pullImageIfNotExists(imageName);
    
    const container=await docker.createContainer({
        Image: imageName,
        Cmd: cmdExecutable,
        AttachStdout: true,
        AttachStderr:true,
        Tty: false,

        HostConfig:{
            PidsLimit: 50,
            NanoCpus: 500000000,
            Memory: 256*1024*1024,
            NetworkMode: "none",
            AutoRemove: true,
        }
    })

    return container;
}

export default createContainer;