import express from 'express';
import { verifyApiTokenRequired } from '../../middleware/authMiddleware.js';
import { activateArticleAction } from '../../controllers/api/articleController.js';

const router = express.Router();

router.post(
    '/:id/:action',
    verifyApiTokenRequired,
    activateArticleAction
);

export default router;