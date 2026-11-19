import express, {Request, Response} from 'express';
import serverConfig from "./config/serverConfig";
import apiRouter from './routes'
import SampleWorker from './workers/SampleWorker';
import SubmissionWorker from './workers/SubmissionWorker';
import loggerMiddleware from './middleware/loggerMiddleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(loggerMiddleware);

app.use('/api',apiRouter);

app.get("/", (req:Request, res:Response)=>{
    res.json({
        message:"Health Checkup",
        status:200,
    })
})


app.listen(serverConfig.PORT, ()=>{
    console.log(`Server is running on Port: ${serverConfig.PORT}`);
    SampleWorker("SampleQueue");
    SubmissionWorker("SubmissionQueue");
});
