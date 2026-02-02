import express from 'express';
import passport from 'passport';
import { verifyWebEmailToken, verifyWebResetToken } from '../../middleware/authMiddleware.js';
import { authGoogle, logout, refreshAuthToken, resetPassword, verifyEmail } from '../../controllers/web/authController.js';

const router = express.Router();

router.get(
    '/google', 
    (req, res, next) => {

        const redirect = req.headers.referer || '/';
        const state = Buffer.from(JSON.stringify({ redirect })).toString('base64');

        passport.authenticate('google', { scope: ['profile', 'email'], state })(req, res, next);
    }
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

router.get(
    '/refresh',
    refreshAuthToken
);

router.post(
    '/logout', 
    logout
);

export default router;