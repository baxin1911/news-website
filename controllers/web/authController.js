import { tokenStore, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../services/jwtService.js';
import { errorCodeMessages, successCodeMessages } from '../../messages/codeMessages.js';
import { errorMessages, successMessages } from '../../messages/messages.js';
import { downloadGoogleAvatar } from '../../services/googleService.js';
import { createProfile } from '../../services/profileService.js';
import { redirectWithFlash } from '../../utils/flashUtils.js';
import { encryptToken } from '../../utils/encryptionUtils.js';
import { clearAuthCookies, setAuthCookies } from '../../utils/cookiesUtils.js';

export const authGoogle = async (req, res) => {

    if (req.query.error) return redirectWithFlash(res, errorMessages.GOOGLE_LOGIN_ERROR, errorCodeMessages.GOOGLE_LOGIN_ERROR, 'error');
    
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
        emailVerified: _json.VERIFIED_EMAIL,
        role: 1,
        totalPosts: 0,
        totalTopics: 0,
        totalAuthors: 0,
        followers: 0
    };

    await createProfile(userGoogle);

    if (!userGoogle.avatarPath) await downloadGoogleAvatar(_json.picture, userGoogle.id);

    const newAccessToken = generateAccessToken(userGoogle);
    const newRefreshToken = generateRefreshToken(userGoogle);

    // Save refresh token in DB
    const hashedToken = encryptToken(newRefreshToken);
    tokenStore.hashedRefreshToken = hashedToken;

    setAuthCookies(res, newAccessToken, newRefreshToken);

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
        username: 'dersey',
        code: 'AA000001',
        role: 1,
        avatarPath: '/img/ejemplo.png',
        coverPath: null,
        totalPosts: 0,
        totalTopics: 0,
        totalAuthors: 0,
        followers: 0
    };
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await createProfile(user);
    setAuthCookies(res, newAccessToken, newRefreshToken);

    // Save refresh token in BD

    return redirectWithFlash(res, successMessages.VERIFIED_EMAIL, successCodeMessages.VERIFIED_EMAIL, 'success');
}

export const refreshAuthToken = async (req, res) => {

    const { refreshToken } = req.cookies;
    
    if (!refreshToken) return redirectWithFlash(res, errorMessages.INVALID_AUTH, errorCodeMessages.INVALID_AUTH, 'error');

    const hashedToken = encryptToken(refreshToken);

    const existsToken = hashedToken === tokenStore.hashedRefreshToken;

    if (!existsToken) return logout(req, res);

    const tokenInfo = verifyRefreshToken(refreshToken);

    if (!tokenInfo) return redirectWithFlash(res, errorMessages.INVALID_AUTH, errorCodeMessages.INVALID_AUTH, 'error');

    const newAccessToken = generateAccessToken(tokenInfo);
    const newRefreshToken = generateRefreshToken(tokenInfo);
    const returnTo = req.cookies.returnTo;

    res.clearCookie('returnTo');
    setAuthCookies(res, newAccessToken, newRefreshToken);

    return res.redirect(returnTo || req.headers.referer);
}

export const logout = async (req, res) => {

    // Delete refreshToken from DB

    tokenStore.hashedRefreshToken = null;
    clearAuthCookies(res);

    return redirectWithFlash(res, successMessages.SUCCESS_LOGOUT, successCodeMessages.SUCCESS_LOGOUT, 'info');
}