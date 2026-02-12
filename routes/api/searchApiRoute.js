import express from 'express';
import { searchFeedWithPagination } from '../../controllers/api/searchController.js';
import { validate } from '../../middleware/validatorMiddleware.js';
import { verifyAuthTokenOptional } from '../../middleware/authMiddleware.js';
import { genericTextValidation } from '../../validators/query/searchValidations.js';

const router = express.Router();

router.get(
    '/', 
    verifyAuthTokenOptional({ source: 'cookies' }), 
    genericTextValidation, 
    validate, 
    searchFeedWithPagination
);

export default router;