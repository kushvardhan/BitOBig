import express from "express";
import {addSubmission, pingTest} from "../../controllers/submissionController";
import { createSubmissionValidatorDTO } from "../../validator/zodValidator";
import { createSubmissionZodSchema } from "../../DTOs/createSubmissionDTO";

const submissionRouter = express.Router();

submissionRouter.get("/ping",pingTest);
submissionRouter.post("/add", createSubmissionValidatorDTO(createSubmissionZodSchema), addSubmission);

export default submissionRouter;