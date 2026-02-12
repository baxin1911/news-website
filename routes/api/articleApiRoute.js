import express from 'express';
import { verifyApiTokenRequired } from '../../middleware/authMiddleware.js';
import { activateArticleAction } from '../../controllers/api/articleController.js';
import { validate } from '../../middleware/validatorMiddleware.js';
import { reactionValidation } from '../../validators/params/reactionValidations.js';

const router = express.Router();

router.post(
    '/:id/:action',
    verifyApiTokenRequired,
    reactionValidation,
    validate,
    activateArticleAction
);

export default router;