import {Request, Response, NextFunction } from "express";
import {ZodSchema} from "zod";

import { CreateSubmissionDTO } from "../DTOs/createSubmissionDTO";

export const createSubmissionValidatorDTO= (schema: ZodSchema<any>)=>(req:Request, res:Response, next: NextFunction)=>{
    const result = schema.safeParse(req.body);
    console.log('Validation result: ', result);

    if(!result.success){
        console.error("Validatio error: ", result.error);
        return res.status(400).json({
            message: "Validationn failed",
            errors: result.error
        });
    }
    next();
}