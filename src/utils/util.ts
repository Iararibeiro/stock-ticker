import * as dotenv from 'dotenv';
import { EnvVariables } from './../types';

dotenv.config();

export const processEnv  = process.env as EnvVariables;