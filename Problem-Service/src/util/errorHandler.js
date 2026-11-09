const {StatusCodes} = require('http-status-codes');
const BaseError = require('../errors/baseError');

function errorHandler(err, req, res, next){
    if(err instanceof BaseError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            details: err.details || {},
            data:{},
        });
    }

    console.log("UNEXPECTED ERROR: ",err);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({sucess:false,
        message: "An unexpected error occurred",
        details: {},
        data:{}
    });
}

module.exports = errorHandler;

