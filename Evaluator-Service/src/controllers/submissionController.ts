import {Request, Response} from "express";
import type { CreateSubmissionDTO } from "../DTOs/createSubmissionDTO";

export function addSubmission(req:Request, res:Response){
    const submissionDTO = req.body as CreateSubmissionDTO;
    console.log(`Recieved Submission`, submissionDTO);

    return res.status(201).json({
        message:"Submission added sucessfully",
        submisson:submissionDTO,
    })
}

export function pingTest(req:Request, res:Response){
    return res.status(201).json({
        message:"PING CHECKKKK",
    })
}