import { transports, createLogger, format, level } from 'winston';
import { LogLevel } from '../types';
import { processEnv } from '../utils/util';
import { create } from 'domain';

/**
 * Get the current date in a specific format for the log files
 */
export function getCurrentDate() {
    const date = new Date();
    let month:  any = date.getMonth() + 1;
    let day: any = date.getDate();

    if (month < 10) { month = `0${month}` }
    if (day < 10) { day = `0${day}` }

    return date.getFullYear() + month + day;
}

const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.File({ filename: `./logs/stock-${getCurrentDate()}-error.log`, level: 'error'}),
        new transports.File({ filename: `./logs/stock-${getCurrentDate()}-info.log`, level: 'info'})
    ]
})

/**
 * Add a log info for the log files
 * @param {LogLevel} levelType The type of log, error or regular log 
 * @param {string} logMessage The message on the log 
 */
export function log(levelType: LogLevel, logMessage: string) {
    logger.log({ level: levelType, message: logMessage});
}