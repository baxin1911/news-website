import express from 'express';
import { profileController } from '../../controllers/web/profileController.js';
import { verifyWebAuthTokenRequired } from '../../middleware/auth.js';

const router = express.Router();

router.get('/profile', verifyWebAuthTokenRequired, profileController);

export default router;