import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

let LOG_DIR;

if (process.env.NODE_ENV === 'production') {
    LOG_DIR = '/app/logs';
} else {
    LOG_DIR = '/home/lam/Documents/projects-logs/dailis';
}

const APP_LOG = `${LOG_DIR}/app/out-%DATE%.log`;
const APP_ERROR_LOG = `${LOG_DIR}/app/error-%DATE%.log`;
const WORKER_LOG = `${LOG_DIR}/worker/out-%DATE%.log`;
const WORKER_ERROR_LOG = `${LOG_DIR}/worker/error-%DATE%.log`;

const appFilter = format((info) => {
    return info.context === 'app' ? info : false;
})

const workerFilter = format((info) => {
    return info.context === 'worker' ? info : false;
})

const logger = createLogger({
    // level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        // format.timestamp(),
        format.json()
    ),
    transports: [
        // App logs
        new DailyRotateFile({
            filename: APP_ERROR_LOG,
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            format: format.combine(appFilter(), format.json())
        }),
        new DailyRotateFile({
            filename: APP_LOG,
            datePattern: 'YYYY-MM-DD',
            format: format.combine(appFilter(), format.json())
        }),

        // // Worker logs
        new DailyRotateFile({
            filename: WORKER_ERROR_LOG,
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            format: format.combine(workerFilter(), format.json())
        }),
        new DailyRotateFile({
            filename: WORKER_LOG,
            datePattern: 'YYYY-MM-DD',
            format: format.combine(workerFilter(), format.json())
        }),
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        })
    ]
});

export const appLogger = {
    info: (message: string, meta = {}) => logger.info(message, { ...meta, context: 'app' }),
    error: (message: string, meta = {}) => logger.error(message, { ...meta, context: 'app' }),
    warn: (message: string, meta = {}) => logger.warn(message, { ...meta, context: 'app' }),
    debug: (message: string, meta = {}) => logger.debug(message, { ...meta, context: 'app' }),
};

export const workerLogger = {
    info: (message: string, meta = {}) => logger.info(message, { ...meta, context: 'worker' }),
    error: (message: string, meta = {}) => logger.error(message, { ...meta, context: 'worker' }),
    warn: (message: string, meta = {}) => logger.warn(message, { ...meta, context: 'worker' }),
    debug: (message: string, meta = {}) => logger.debug(message, { ...meta, context: 'worker' }),
};