import submissionQueue from "../queues/submissionQueue";

export default async function(payload:Record<string, unknown>, priority?:number){
    console.log("Adding job to SubmissionQueue with payload: ", payload," and priority: ", priority);
    await submissionQueue.add("SubmissionJob", payload, {priority: priority||1});
    console.log("Job added to SubmissionQueue");
}