import express from 'express';
import { searchArticle } from '../../controllers/api/searchController.js';
import { validate } from '../../middleware/validatorMiddleware.js';
import { genericTextValidation } from '../../validators/forms/validations.js';
import { verifyAuthTokenOptional } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get(
    '/', 
    verifyAuthTokenOptional({ source: 'cookies' }), 
    genericTextValidation, 
    validate, 
    searchArticle
);

export default router;