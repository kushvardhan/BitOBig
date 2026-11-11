const mongoose = require('mongoose');
const { NODE_ENV, MONGO_URI } = require('./server.config');

async function connectDB(){
    try{
        if(NODE_ENV === 'development'){  
            return await mongoose.connect(MONGO_URI);
        }
    }catch(err){
        console.log("ERROR CONNECTING WITH DB.");
        console.log(err);
    }
}

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected.');
});


module.exports = connectDB;