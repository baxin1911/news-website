import { generateAccessToken, generateRefreshToken } from '../../services/jwtService.js';
import { errorCodeMessages, successCodeMessages } from '../../messages/codeMessages.js';
import { errorMessages, successMessages } from '../../messages/messages.js';
import { downloadGoogleAvatar } from '../../services/googleService.js';
import { createProfile } from '../../services/profileService.js';
import { redirectWithFlash } from '../../utils/flashUtils.js';

export const authGoogle = async (req, res) => {

    if (req.query.error) return redirectWithFlash(res, errorMessages.LOGIN_ERROR_GOOGLE, errorCodeMessages.LOGIN_ERROR_GOOGLE, 'error');
    
    const { user } = req;
    const { _json, provider } = user;
    const userGoogle = { 
        id: 1,
        code: 'AA000001',
        sub: _json.sub, 
        provider, 
        username: _json.name,
        name: _json.given_name,
        lastName: _json.family_name,
        avatarPath: null,
        coverPath: null,
        email: _json.email,
        emailVerified: _json.email_verified,
        role: 1,
        totalPosts: 0,
        totalTopics: 0,
        totalAuthors: 0,
        followers: 0
    };

    await createProfile(userGoogle);

    if (!userGoogle.avatarPicture) await downloadGoogleAvatar(_json.picture);

    const accessToken = generateAccessToken(userGoogle);
    const refreshToken = generateRefreshToken(userGoogle);

    // Save refresh token in DB

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

export const resetPassword = async (req, res) => {

    const { token } = req;

    return res.render('reset', { token });
}

export const verifyEmail = async (req, res) => {

    const { id } = req;

    //Search user and chance emailVerified
    //emailVerified = true

    const user = {
        id: 1,
        email,
        emailVerified: true,
        displayName: 'dersey',
        code: 'AA000001',
        role: 1,
        avatarPath: '/img/ejemplo.png',
        coverPath: null,
        totalPosts: 0,
        totalTopics: 0,
        totalAuthors: 0,
        followers: 0
    };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await createProfile(user);

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

export const logout = async (req, res) => {

    // Delete refreshToken from DB

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return redirectWithFlash(res, successMessages.LOGOUT_SUCCESS, successCodeMessages.LOGOUT_SUCCESS, 'info');
}