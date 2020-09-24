import * as dotenv from 'dotenv';
import { EnvVariables } from './../constants';

dotenv.config();

/** The environment variables */
export const processEnv = EnvVariables;

/**
 * Format a path to the one used in the system
 * @param {string} filePath The file path
 * @return {string} The correct file path following the pattern './data/file.name'
 */
export function formatPath(filePath: string) {
    return `./${filePath}`;
}

/**
 * Get the format file path based in the file name
 * @param {string} fileName The file name
 * @return {string} The file path with the file name, following the pattern './data/file.name'
 */
export function getFilePath(fileName: string) {
    return EnvVariables.DATA_PATH + fileName;
}