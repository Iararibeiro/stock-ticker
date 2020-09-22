import * as express from 'express';
const process = require('process'); 

import * as logHandler from './utils/log-handler';
import { processEnv } from './utils/util';

import * as fileRoutes from './routes/file';
import * as searchRoutes from './routes/search';

export const app = express();

app.use('/file', fileRoutes.router);
app.use('/search', searchRoutes.router);

process.title = processEnv.PROCESS_NAME;

const server = app.listen(processEnv.PORT || 3000, () => {
    const message = `Server started, listen at ${processEnv.PORT || 3000} , PID ${process.pid}`;
    console.log(message);
    logHandler.log('info', message);
})
