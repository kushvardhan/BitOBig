import { Job } from 'bullmq';
import type { IJob } from '../interface/bullMqJobDefinition';
import logger from '../utils/logger';

export default class SampleJob implements IJob {
    name: string;
    payload: Record<string, unknown>;

    constructor(payload: Record<string, unknown>) {
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle = (job?: Job): void => {
        logger.info("Handling Sample Job", {
            jobName: job?.name,
            payload: this.payload,
        });

        if (job) {
            logger.info("Job details", {
                id: job.id,
                name: job.name,
                attemptsMade: job.attemptsMade,
            });
        }
    };

    failed = (job?: Job): void => {
        logger.error("Sample Job Failed", {
            payload: this.payload,
            jobId: job?.id,
            jobName: job?.name,
        });
    };
}   