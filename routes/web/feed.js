import express from 'express';
import { categoryFeedController, searchFeedController } from '../../controllers/web/feedController.js';
import { verifyWebAuthTokenOptional } from '../../middleware/auth.js';

const router = express.Router();

router.get('/search', verifyWebAuthTokenOptional, searchFeedController);

router.get('/categories/:slug', verifyWebAuthTokenOptional, categoryFeedController);

export default router;