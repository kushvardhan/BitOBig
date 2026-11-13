import express from "express";
import {addSubmission, pingTest} from "../../controllers/submissionController";

const submissionRouter = express.Router();

submissionRouter.get("/ping",PingTest);
submissionRouter.post("/add", addSubmission);

export default submissionRouter;