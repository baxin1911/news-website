import express from 'express';
import { searchFeedWithPagination } from '../../controllers/api/searchController.js';
import { validate } from '../../middleware/validatorMiddleware.js';
import { genericTextValidation } from '../../validators/forms/validations.js';
import { verifyAuthTokenOptional } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get(
    '/', 
    verifyAuthTokenOptional({ source: 'cookies' }), 
    genericTextValidation, 
    validate, 
    searchFeedWithPagination
);

export default router;