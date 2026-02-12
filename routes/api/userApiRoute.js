import express from 'express';
import { validate } from '../../middleware/validatorMiddleware.js';
import { verifyApiTokenRequired } from '../../middleware/authMiddleware.js';
import { searchUser } from '../../controllers/api/userController.js';
import { genericTextValidation } from '../../validators/query/searchValidations.js';

const router = express.Router();

router.get(
    '/', 
    verifyApiTokenRequired, 
    genericTextValidation, 
    validate, 
    searchUser
);

export default router;