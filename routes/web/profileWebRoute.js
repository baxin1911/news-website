import express from 'express';
import { getProfile } from '../../controllers/web/profileController.js';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get(
    '/profile', 
    verifyCookiesAuthTokenRequired, 
    getProfile
);

export default router;