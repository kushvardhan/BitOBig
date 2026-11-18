import type { Job } from "bullmq";
import type { IJob } from "../interface/bullMqJobDefinition";
import logger from "../utils/logger";
import type { SubmissionPayload } from "../interface/submissionPayload";

export default class SubmissionJob implements IJob{
    name: string;
    payload: SubmissionPayload;
    constructor(payload: SubmissionPayload){
        this.name = this.constructor.name;
        this.payload = payload;

    }
    handle= async(job?:Job){
        console.log("Handling Submission Job with Payload:",
        this.payload);

        logger.info("Handling Submission Job",{
            jobName: job?.name,
            payload: this.payload
        });

        if(!job){
            throw new Error("Job is undefined");
        }
        const key = Object.keys(this.payload)[0];

        if(!key){
            throw new Error("Payload is empty");
        }

        const submission = this.payload[key]!;
        const codeLanguage = submission.language;

        console.log("Language: ", codeLanguage);
        
        

    }

}