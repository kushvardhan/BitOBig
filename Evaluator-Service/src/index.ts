import express, {Request, Response} from 'express';

const app = express();

app.use(express.json());

app.get("/health", (req:Request, res:Response)=>{
    res.json({
        message:"Health Checkup",
        status:200,
    })
})


app.listen(3001, ()=>{
    console.log(`Server started at PORT: 3001`);
})
