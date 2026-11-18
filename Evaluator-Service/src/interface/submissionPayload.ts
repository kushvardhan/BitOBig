export interface SubmissionData{
    language: string;
    inputCase: string;
    code: string;
}

export type SubmissionPayload = Record<string, SubmissionData>;