import express from 'express';
import { verifyApiTokenRequired } from '../../middleware/authMiddleware.js';
import { activateCommentAction, createComment } from '../../controllers/api/commentController.js';
import { commentValidation } from '../../validators/forms/commentValidations.js';
import { validate } from '../../middleware/validatorMiddleware.js';
import { reactionValidation } from '../../validators/params/reactionValidations.js';

const router = express.Router();

router.post(
    '/:id/:action',
    verifyApiTokenRequired,
    reactionValidation,
    validate,
    activateCommentAction
);

router.post(
    '/',
    verifyApiTokenRequired,
    commentValidation,
    validate,
    createComment
);

export default router;