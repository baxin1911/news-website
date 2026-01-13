import express from 'express';
import { subscribeToNewsletter } from '../../controllers/api/newsletterController.js';
import { emailValidation } from '../../validators/forms/validations.js';
import { validate } from '../../middleware/validatorMiddleware.js';

const router = express.Router();

router.post(
    '/subscribe', 
    emailValidation, 
    validate, 
    subscribeToNewsletter
);

export default router;