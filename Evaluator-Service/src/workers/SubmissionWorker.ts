import type { Job } from "bullmq";
import redisConfig from "../config/redisConfig";
import SubmissionJob from "../jobs/SubmissionJob";
import type { IJob } from "../interface/bullMqJobDefinition";
import type { WorkerResponse } from "../interface/bullMqWorkerResponse";

export default function SubmissionWorker(queueName:string){
    new Worker<IJob, WorkerResponse>(
        queueName,
        async (job:Job)=>{
            console.log("Worker received job: ", job.name);
            if(job.name=== "SubmissionJob"){
                const submissionJobInstance = new SubmissionJob(job.data);

                submissionJobInstance.handle(job);

                return {
                    status:200,
                    message: "Job processed successfully"
                };
            }
            return {
                status: 400,
                message:"Job not recognized"
            };

        },
        {
            connection:redisConfig
        }

    )
}