const express=require("express");
const { PORT } = require("./config/server.config");
const connectDB = require("./config/db.config");
const {errorHandler} = require("./util/errorHandler");

const app=express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use('/api',require('./routes'));

app.get('/health',(req,res)=>{
    res.send("Hey Yall");
})

app.use(errorHandler);


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  try {
    await connectDB();
    console.log("Connected to DB.");
  } catch (err) {
    console.log("DB connection failed");
    throw err;
  }
});