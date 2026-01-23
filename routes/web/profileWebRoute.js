import express from 'express';
import { getProfileWithPagination } from '../../controllers/web/profileController.js';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get(
    '/profile', 
    verifyCookiesAuthTokenRequired, 
    getProfileWithPagination
);

export default router;