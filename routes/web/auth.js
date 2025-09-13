import express from 'express';
import passport from 'passport';
import { generateAccessToken, generateRefreshToken } from '../../config/jwt.js';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), 
    (req, res) => {

        if (req.query.error) return res.redirect('/?loginError=google');
        
        const { user } = req;
        const { _json, provider } = user;
        const userGoogle = { 
            code: 'AA000001',
            sub: _json.sub, 
            provider, 
            displayName: _json.name,
            givenName: _json.given_name,
            familyName: _json.familly_name,
            picture: _json.picture,
            email: _json.email,
            emailVerified: _json.email_verified,
            role: 1,
            totalPosts: 0,
            totalTopics: 0,
            following: 0,
            followers: 0
        };

        const accessToken = generateAccessToken(userGoogle);
        const refreshToken = generateRefreshToken(userGoogle);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60 *1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });

        res.redirect('/user/profile');
    }
);

router.post('/logout', async (req, res) => {

    // Delete refreshToken from DB

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.redirect("/");
});

export default router;