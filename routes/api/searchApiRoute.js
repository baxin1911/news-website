import express from 'express';
import { searchArticle } from '../../controllers/api/searchController.js';
import { validate } from '../../middleware/validatorMiddleware.js';
import { genericTextValidation } from '../../validators/forms/validations.js';

const router = express.Router();

router.get(
    '/', 
    genericTextValidation, 
    validate, 
    searchArticle
);

export default router;