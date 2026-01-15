import express from 'express';
import { showCategoryFeed, searchFeed } from '../../controllers/web/feedController.js';
import { verifyCookiesAuthTokenOptional } from '../../middleware/authMiddleware.js';
import { resolveSlug } from '../../controllers/web/slugController.js';

const router = express.Router();

router.get(
    '/search', 
    verifyCookiesAuthTokenOptional, 
    searchFeed
);

router.get(
    '/categories/:slug', 
    verifyCookiesAuthTokenOptional, 
    showCategoryFeed
);

router.get(
    '/:slug',
    verifyCookiesAuthTokenOptional,
    resolveSlug
)

export default router;