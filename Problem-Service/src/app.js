const express=require("express");
const { PORT } = require("./config/server.config");
const app=express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use('/api',require('./routes'));

app.get('/health',(req,res)=>{
    res.send("Hey Yall");
})


app.listen(PORT,()=>{
    console.log(`Started the serveer at PORT:${PORT}`);
})