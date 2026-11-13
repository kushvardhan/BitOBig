import express from "express";
import {addSubmission, PingTest} from "../../controllers/submissionController";

const submissionRouter = express.Router();

submissionRouter.get("/ping",PingTest);
submissionRouter.post("/add", addSubmission);

export default submissionRouter;