import { tokenStore, generateAccessToken, generateRefreshToken } from '../../services/jwtService.js';
import { errorCodeMessages, successCodeMessages } from '../../messages/codeMessages.js';
import { errorMessages, successMessages } from '../../messages/messages.js';
import { redirectWithFlash } from '../../utils/flashUtils.js';
import { encryptToken } from '../../utils/encryptionUtils.js';
import { clearAuthCookies, setAuthCookies } from '../../utils/cookiesUtils.js';
import { createUserDtoForToken } from '../../dtos/userDTO.js';
import { verifyRegisteredEmailByUserId } from '../../services/userService.js';
import { getRoleByUserId } from '../../services/userService.js';
import { getNewRefreshToken } from '../../services/authService.js';

export const authGoogle = async (req, res) => {

    if (req.query.error) return redirectWithFlash(
        res, 
        errorMessages.GOOGLE_LOGIN_ERROR, 
        errorCodeMessages.GOOGLE_LOGIN_ERROR, 
        'error'
    );

    let redirect = '/';

    if (req.query.state) {

        try {

            const data = JSON.parse(Buffer.from(req.query.state, 'base64').toString());
            redirect = data.redirect || '/profile';

        } catch (e) {}
    }

    if (!redirect.startsWith('http://localhost:3000/')) redirect = '/profile';

    const { user } = req;
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

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

    const role = await getRoleByUserId(id);
    const tokenDto = createUserDtoForToken(id, role.name);
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