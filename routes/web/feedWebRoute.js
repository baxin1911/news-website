import express from 'express';
import { categoryFeedController, searchFeedController } from '../../controllers/web/feedController.js';
import { verifyCookiesAuthTokenOptional } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/search', verifyCookiesAuthTokenOptional, searchFeedController);
router.get('/categories/:slug', verifyCookiesAuthTokenOptional, categoryFeedController);

export default router;