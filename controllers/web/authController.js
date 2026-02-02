import { tokenStore, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../services/jwtService.js';
import { errorCodeMessages, successCodeMessages } from '../../messages/codeMessages.js';
import { errorMessages, successMessages } from '../../messages/messages.js';
import { downloadGoogleAvatar } from '../../services/googleService.js';
import { redirectWithFlash } from '../../utils/flashUtils.js';
import { encryptToken } from '../../utils/encryptionUtils.js';
import { clearAuthCookies, setAuthCookies } from '../../utils/cookiesUtils.js';
import { findUserByEmail, getUserIdByEmail, saveUser, saveProfile, saveUserPreferences } from '../../services/userService.js';
import { createUserDtoForToken, createUserDtoFromGoogle } from '../../dtos/userDTO.js';
import { createProfileDtoForGoogleAuth } from '../../dtos/profileDTO.js';
import { createUserPreferencesDtoForRegister } from '../../dtos/preferencesDTO.js';
import { verifyRegisteredEmailByUserId } from '../../services/userService.js';
import { getRoleNameByUserId } from '../../services/userService.js';
import { getNewRefreshToken } from '../../services/authService.js';

export const authGoogle = async (req, res) => {

    if (req.query.error) return redirectWithFlash(
        res, 
        errorMessages.GOOGLE_LOGIN_ERROR, 
        errorCodeMessages.GOOGLE_LOGIN_ERROR, 
        'error'
    );
    
    const { user } = req;
    const { _json, provider } = user;
    const profileDto = createProfileDtoForGoogleAuth(_json, provider);
    const email = _json.email;
    const existsUser = await findUserByEmail(email);
    let userId = null;
    
    if (!existsUser) {

        const userDto = createUserDtoFromGoogle(_json);
        userId = await saveUser(userDto);

        const avatarPath = await downloadGoogleAvatar(_json.picture, userId);
        profileDto.avatarPath = avatarPath;
        profileDto.userId = userId;

        await saveProfile(profileDto);

        const preferencesDto = createUserPreferencesDtoForRegister(userId);

        await saveUserPreferences(preferencesDto);

    } else {

        userId = await getUserIdByEmail(email);
    }

    let redirect = '/';

    if (req.query.state) {

        try {

            const data = JSON.parse(Buffer.from(req.query.state, 'base64').toString());
            redirect = data.redirect || '/profile';

        } catch (e) {}
    }

    if (!redirect.startsWith('http://localhost:3000/')) redirect = '/profile';

    const role = await getRoleNameByUserId(userId);
    const tokenDto = createUserDtoForToken(userId, role);
    const newAccessToken = generateAccessToken(tokenDto);
    const newRefreshToken = generateRefreshToken(tokenDto);

    // Save refresh token in DB
    const hashedToken = encryptToken(newRefreshToken);
    tokenStore.hashedRefreshToken = hashedToken;

    setAuthCookies(res, newAccessToken, newRefreshToken);

    return res.redirect(redirect);
}

export const resetPassword = async (req, res) => {

    const { token } = req;

    return res.render('pages/auth/resetPage', { token });
}

export const verifyEmail = async (req, res) => {

    const { id } = req;
    
    await verifyRegisteredEmailByUserId(id);

    const role = await getRoleNameByUserId(id);
    const tokenDto = createUserDtoForToken(id, role);
    const newAccessToken = generateAccessToken(tokenDto);
    const newRefreshToken = generateRefreshToken(tokenDto);

    setAuthCookies(res, newAccessToken, newRefreshToken);

    // Save refresh token in BD

    return redirectWithFlash(
        res, 
        successMessages.VERIFIED_EMAIL, 
        successCodeMessages.VERIFIED_EMAIL, 
        'success'
    );
}

export const refreshAuthToken = async (req, res) => {

    const { refreshToken } = req.cookies;
    const result = await getNewRefreshToken(refreshToken);

    if (result.error) {
        
        req.error = result.error;

        return logout(req, res);
    }
    
    const returnTo = req.cookies.returnTo;

    res.clearCookie('returnTo');
    setAuthCookies(res, result.newAccessToken, result.newRefreshToken);

    return res.redirect(returnTo || req.headers.referer);
}

export const logout = async (req, res) => {

    const returnTo = req.cookies.returnTo;
    res.clearCookie('returnTo');

    // Delete refreshToken from DB

    tokenStore.hashedRefreshToken = null;
    clearAuthCookies(res);

    return redirectWithFlash(
        res, 
        req.error ? errorMessages.INVALID_AUTH : successMessages.SUCCESS_LOGOUT, 
        req.error ?? successCodeMessages.SUCCESS_LOGOUT, 
        req.error ? 'error' : 'info',
        returnTo || req.headers.referer
    );
}