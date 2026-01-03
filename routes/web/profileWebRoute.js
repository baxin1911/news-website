import express from 'express';
import { profileController } from '../../controllers/web/profileController.js';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyCookiesAuthTokenRequired, profileController);

export default router;