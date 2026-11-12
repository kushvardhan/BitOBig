
const winston = require('winston');
const { MongoDB } = require('winston-mongodb');

const { LOGGER_MONGO_URI } = require('./server.config');

winston.addColors({
    error: 'bold red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue'
});

const logFormat = winston.format.printf(
    ({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level}]: ${stack || message}`;
    }
);

const allowedTransports = [];

// MongoDB Transport
if (LOGGER_MONGO_URI) {
    allowedTransports.push(
        new MongoDB({
            level: 'error',
            db: LOGGER_MONGO_URI,
            collection: 'logs'
        })
    );
}

// File Transport
allowedTransports.push(
    new winston.transports.File({
        filename: 'app.log',
        level: 'debug'
    })
);

// Console Transport
allowedTransports.push(
    new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.errors({ stack: true }),
            winston.format.colorize({ level: true }),
            winston.format.padLevels(),
            logFormat
        )
    })
);

const logger = winston.createLogger({
    level: 'debug',
    transports: allowedTransports,
    exitOnError: false
});

module.exports = logger;
