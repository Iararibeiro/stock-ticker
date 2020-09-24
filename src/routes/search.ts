import * as express from 'express';
import * as searchController from '../controllers/search';

export const router = express.Router();

/** Search for an specific file */
router.get('/:ticker/:file', searchController.searchData);
