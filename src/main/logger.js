const {createLogger,format,transports} = require('winston')
const {combine, timestamp, label, printf} = format

const customFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} - [${level}] - ${message}`
})

const combined = combine(timestamp(), customFormat)

const logger = createLogger({
    format: combined,
    transports: [
        new transports.File({filename:'error.log',level: 'error'}),
        new transports.File({filename:'combined.log',level: 'info'})
    ],
    exceptionHandlers:[    
        new transports.File({filename:'exceptions.log'})
    ]
})

if(process.env.NODE_ENV !== 'production'){
    logger.add(new transports.Console({
        format:combined
    }))
}

export {logger};