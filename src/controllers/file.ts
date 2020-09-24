import * as fs from 'fs';
import path = require('path');
import * as express from 'express';
import * as formidable from 'formidable';

/** log service */
import * as logHandler from './../utils/log-handler';
/** environment variables and common files */
import { processEnv, formatPath } from './../utils/util';

/**
 * Upload a file and save it to the data folder
 * @param req 
 * @param res 
 * @param next 
 */
export function uploadFile(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let fileName: string = '';
        let filePath: string = '';
        const formidableOptions = {
            uploadDir: processEnv.DATA_PATH,
            keepExtension: true
        }
        // @ts-ignore
        const form = formidable(formidableOptions);
        // @ts-ignore
        form.parse(req, (err, fields, file) => {
            
            if (file['file'] === undefined) {
                return res.status(500).json({'error':'Incorrent parameters, file information not found'});
            }

            if (err) {
                logHandler.log('error', `Error uploading a file - ${err}`);
                console.log(err);
                return res.status(500).json({'error':'Error processing the file'});
            }
            fileName = file['file'].name;
            filePath = formatPath(file['file'].path);

            let newFilePath = formatPath(path.join(processEnv.DATA_PATH, fileName));

            fs.rename(filePath, newFilePath, function(err) {
                if (err) {
                    logHandler.log('error', `Error renaming the file - ${err}`);
                    console.log(err);
                    return res.status(500).json({'error':'Error processing the file'});
                }
            });

            return res.status(200).json({'message': 'file received'});
        });
    } catch (err) {
        logHandler.log('error', `Error uploading a file - ${err}`);
        return res.status(500);
    }
}