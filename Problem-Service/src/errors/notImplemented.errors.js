const {StatusCodes} = require('http-status-codes');
const BaseError = require('./baseError');

class NotImplemented extends BaseError{
    constructor(methodName){
                super("NotImplementedError",StatusCodes.NOT_IMPLEMENTED,`${methodName} NOT IMPLEMENTED`,{});
    }
}

module.exports = NotImplemented;