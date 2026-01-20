import express from 'express';
import { verifyAuthTokenOptional } from '../../middleware/authMiddleware.js';
import { validate } from '../../middleware/validatorMiddleware.js';
import { contactValidation } from '../../validators/forms/contactValidations.js';
import { createContact } from '../../controllers/api/contactController.js';

const router = express.Router();

router.post(
    '/',
    verifyAuthTokenOptional({ source: 'cookies' }),
    contactValidation,
    validate,
    createContact
);

export default router;