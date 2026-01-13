import express from 'express';
import passport from 'passport';
import { verifyWebEmailToken, verifyWebResetToken } from '../../middleware/authMiddleware.js';
import { authGoogle, logout, resetPassword, verifyEmail } from '../../controllers/web/authController.js';

const router = express.Router();

router.get(
    '/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
    '/google/callback', 
    passport.authenticate('google', { session: false }), 
    authGoogle
);

router.get(
    '/password-reset', 
    verifyWebResetToken, 
    resetPassword
);

router.get(
    '/email-verify', 
    verifyWebEmailToken, 
    verifyEmail
);

router.post(
    '/logout', 
    logout
);

export default router;