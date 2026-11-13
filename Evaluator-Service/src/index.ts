import express, {Request, Response} from 'express';
import serverConfig from "./config/serverConfig";
import apiRouter from './routes'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/api',apiRouter);

app.get("/", (req:Request, res:Response)=>{
    res.json({
        message:"Health Checkup",
        status:200,
    })
})


app.listen(serverConfig.PORT, ()=>{
    console.log(`Server is running on Port: ${serverConfig.PORT}`);
});
