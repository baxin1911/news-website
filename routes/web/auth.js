import express from 'express';
import passport from 'passport';
import { verifyWebEmailToken, verifyWebResetToken } from '../../middleware/auth.js';
import { authGoogleController, logoutController, resetPasswordController, verifyEmailController } from '../../controllers/web/authController.js';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), authGoogleController);

router.get('/password-reset', verifyWebResetToken, resetPasswordController);

router.get('/email-verify', verifyWebEmailToken, verifyEmailController);

router.post('/logout', logoutController);

export default router;