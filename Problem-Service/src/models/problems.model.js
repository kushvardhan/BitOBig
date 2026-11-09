const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Problem title is required"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"Problem description is required"],
        trim:true,
    },
    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        required:[true,"Problem difficulty is required"],
        default:"easy"
    },
    testCases:[
        {
            input: {
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            }
        }
    ],
    editorial:{
        type:String,
    }
}, {timestamps:true});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;