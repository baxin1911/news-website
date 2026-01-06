import express from 'express';
import { subscribeController } from '../../controllers/api/newsletterController.js';
import { emailValidation } from '../../validators/forms/validations.js';
import { validate } from '../../middleware/validatorMiddleware.js';

const router = express.Router();

router.post(
    '/subscribe', 
    emailValidation, 
    validate, 
    subscribeController
);

export default router;