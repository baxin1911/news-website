import express from 'express';
import { showCategoryFeed, searchFeed } from '../../controllers/web/feedController.js';
import { verifyAuthTokenOptional } from '../../middleware/authMiddleware.js';
import { resolveSlug } from '../../controllers/web/slugController.js';

const router = express.Router();

router.get(
    '/search', 
    verifyAuthTokenOptional({ source: 'cookies' }), 
    searchFeed
);

router.get(
    '/categories/:slug', 
    verifyAuthTokenOptional({ source: 'cookies' }), 
    showCategoryFeed
);

router.get(
    '/:slug',
    verifyAuthTokenOptional({ source: 'cookies' }), 
    resolveSlug
)

export default router;