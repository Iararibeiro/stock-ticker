import * as express from 'express';
import * as fileController from '../controllers/file';

export const router = express.Router();

/** Upload a dataset */
router.put('/upload', fileController.uploadFile);