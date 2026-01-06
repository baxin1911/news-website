import { generateAccessToken, generateRefreshToken } from '../../config/jwtlConfig.js';
import { errorCodeMessages, successCodeMessages } from '../../messages/codeMessages.js';
import { errorMessages, successMessages } from '../../messages/messages.js';
import { createProfileService } from '../../services/profileService.js';
import { redirectWithFlash } from '../../utils/flashUtils.js';

export const authGoogleController = async (req, res) => {

    if (req.query.error) return redirectWithFlash(res, errorMessages.LOGIN_ERROR_GOOGLE, errorCodeMessages.LOGIN_ERROR_GOOGLE, 'error');
    
    const { user } = req;
    const { _json, provider } = user;
    const userGoogle = { 
        code: 'AA000001',
        sub: _json.sub, 
        provider, 
        username: _json.name,
        name: _json.given_name,
        lastName: _json.family_name,
        profilePicture: _json.picture,
        email: _json.email,
        emailVerified: _json.email_verified,
        role: 1,
        totalPosts: 0,
        totalTopics: 0,
        totalAuthors: 0,
        followers: 0
    };

    userGoogle.id = 1; // Simulate DB ID

    const accessToken = generateAccessToken(userGoogle);
    const refreshToken = generateRefreshToken(userGoogle);

    // Save refresh token in DB
    await createProfileService(userGoogle);

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

    return res.redirect('/profile');
}

export const resetPasswordController = async (req, res) => {

    const { token } = req;

    return res.render('reset', { token });
}

export const verifyEmailController = async (req, res) => {

    const { id } = req;

    //Search user and chance emailVerified
    //emailVerified = true

    const user = {
        email,
        emailVerified: true,
        displayName: 'dersey',
        code: 'AA000001',
        role: 1,
        picture: '/img/ejemplo.png',
        totalPosts: 0,
        totalTopics: 0,
        totalAuthors: 0,
        followers: 0
    };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.id = 1;

    await createProfileService(user);

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

    // Save refresh token in BD

    return redirectWithFlash(res, successMessages.EMAIL_VERIFIED, successCodeMessages.EMAIL_VERIFIED, 'success');
}

export const logoutController = async (req, res) => {

    // Delete refreshToken from DB

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return redirectWithFlash(res, successMessages.LOGOUT_SUCCESS, successCodeMessages.LOGOUT_SUCCESS, 'info');
}