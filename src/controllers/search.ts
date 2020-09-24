import * as fs from 'fs';
import * as express from 'express';
import * as logHandler from './../utils/log-handler';
import * as csvtojson from 'csvtojson';

import { getFilePath } from './../utils/util';

/**
 * Check if a file exists in the data path.
 * @param {string} filePath 
 * @return {boolean} If the file exists or not
 */
function checkFileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
}

/**
 * Search Data for an specific stock name, if the file doesnt exists return 404 if
 * the query term doesnt exists return an empty array
 * @param req 
 * @param res 
 * @param next 
 */
export function searchData(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const query = req.params.ticker;
        const dataset = req.params.file;
        const filePath = getFilePath(dataset);

        if (checkFileExists(filePath)) {
            csvtojson().fromFile(filePath).then(function(data){ 
                const result = data.filter(row => row.stock === query);
                return res.status(200).json(result);
            });
        } else {
            return res.status(404).json({'error': 'file not found'});
        }
    } catch (err) {
        logHandler.log('error', `Error searching - ${err}`);
        return res.status(500).json({'error': 'search invalid'});
    }
}