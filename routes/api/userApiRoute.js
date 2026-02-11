import express from 'express';
import { validate } from '../../middleware/validatorMiddleware.js';
import { genericTextValidation } from '../../validators/forms/validations.js';
import { verifyApiTokenRequired } from '../../middleware/authMiddleware.js';
import { searchUser } from '../../controllers/api/userController.js';

const router = express.Router();

router.get(
    '/', 
    verifyApiTokenRequired, 
    genericTextValidation, 
    validate, 
    searchUser
);

export default router;