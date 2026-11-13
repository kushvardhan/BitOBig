import {Request, Response} from "express";

export function addSubmission(req:Request, res:Response){
    console.log(`Recieved Submission`, req.body);

    return res.status(201).json({
        message:"Submission added sucessfully",
    })
}

export function PingTest(req:Request, res:Response){
    return res.status(201).json({
        message:"PING CHECKKKK",
    })
}