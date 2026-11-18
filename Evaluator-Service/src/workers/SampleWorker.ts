import type { Job } from "bullmq";
import SampleJob from "../jobs/SampleJob";
import redisConfig from "../config/redisConfig";
import type { WorkerResponse } from "../interface/bullMqWorkerResponse";
import type { IJob } from "../interface/bullMqJobDefinition";

export default function SampleWorker(queueName: string) {
    return new Worker<IJob, WorkerResponse>(
        queueName,
        async (job: Job) => {
            if (job.name !== 'SampleJob') {
                return {
                    status: 400,
                    message: 'Job not recognized',
                };
            }

            const sampleJobInstance = new SampleJob(job.data as Record<string, unknown>);

            try {
                await sampleJobInstance.handle(job);
                return {
                    status: 200,
                    message: 'Job processed successfully',
                };
            } catch (error) {
                sampleJobInstance.failed(job);
                throw error; // re-throw so BullMQ marks it as failed
            }
        },
        {
            connection: redisConfig,
        }
    );
}