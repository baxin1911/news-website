import express from 'express';
import { verifyApiTokenRequired } from '../../middleware/authMiddleware.js';
import { activateCommentAction } from '../../controllers/api/commentController.js';

const router = express.Router();

router.post(
    '/:id/:action',
    verifyApiTokenRequired,
    activateCommentAction
);

export default router;