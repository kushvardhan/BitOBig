
import { Request, Response } from "express";
import { createSubmissionZodSchema } from "../DTOs/createSubmissionDTO";

export function addSubmission(req: Request, res: Response) {
    const result = createSubmissionZodSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid submission data",
            errors: result.error.issues
        });
    }

    const submissionDTO = result.data;

    console.log("Received Submission: ", submissionDTO);

    return res.status(201).json({
        message: "Submission added successfully",
        submission: submissionDTO
    });
}

export function pingTest(req: Request, res: Response) {
    return res.status(200).json({
        message: "PING CHECKKKK"
    });
}
