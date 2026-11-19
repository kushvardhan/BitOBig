import type { Job } from "bullmq";
import type { IJob } from "../interface/bullMqJobDefinition";
import logger from "../utils/logger";
import type { SubmissionPayload } from "../interface/submissionPayload";

export default class SubmissionJob implements IJob {
    name: string;
    payload: SubmissionPayload;

    constructor(payload: SubmissionPayload) {
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle = async (job?: Job): Promise<void> => {
        logger.info("Handling Submission Job", {
            jobName: job?.name,
            payload: this.payload,
        });

        if (!job) {
            throw new Error("Job is undefined");
        }

        const key = Object.keys(this.payload)[0];

        if (!key) {
            throw new Error("Payload is empty");
        }

        const submission = this.payload[key as keyof SubmissionPayload];
        const codeLanguage = submission.language;

        logger.info("Processing submission", {
            key,
            language: codeLanguage,
        });
    };

    failed = (job?: Job): void => {
        logger.error("Submission Job Failed", {
            payload: this.payload,
            jobId: job?.id,
            jobName: job?.name,
        });
    };
}   