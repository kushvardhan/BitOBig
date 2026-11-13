import express from 'express';
import submissionRouter from "./submissionRouter";

const v1Router = express.Router();

v1Router.use('/submission', submissionRouter);

export default v1Router;