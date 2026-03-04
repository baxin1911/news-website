import { tokenStore } from '../../services/jwtService.js';
import { errorCodeMessages, successCodeMessages } from '../../messages/codeMessages.js';
import { errorMessages, successMessages } from '../../messages/messages.js';
import { redirectWithFlash } from '../../utils/flashUtils.js';
import { clearAuthCookies, setAuthCookies } from '../../utils/cookiesUtils.js';
import { generateAuthTokens, getNewRefreshToken, getTokensFromVerifiedEmail } from '../../services/authService.js';
import { DetectedReuseError, InvalidAuthError } from '../../errors/authError.js';

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
    const tokens = await generateAuthTokens(user);

    setAuthCookies(res, tokens.newAccessToken, tokens.newRefreshToken);

    return res.redirect(redirect);
}

export const resetPassword = async (req, res) => {

    const { token } = req;

    return res.render('pages/auth/resetPage', { token });
}

export const verifyEmail = async (req, res) => {
    
    const tokens = await getTokensFromVerifiedEmail(req.id);

    setAuthCookies(res, tokens.newAccessToken, tokens.newRefreshToken);

    return redirectWithFlash(
        res, 
        successMessages.VERIFIED_EMAIL, 
        successCodeMessages.VERIFIED_EMAIL, 
        'success'
    );
}

export const refreshAuthToken = async (req, res) => {

    try {

        const { refreshToken } = req.cookies;
        const tokens = await getNewRefreshToken(refreshToken);
        
        const returnTo = req.cookies.returnTo;

        res.clearCookie('returnTo');
        setAuthCookies(res, tokens.newAccessToken, tokens.newRefreshToken);

        return res.redirect(returnTo || req.headers.referer);

    } catch (error) {

        if (error instanceof InvalidAuthError || error instanceof DetectedReuseError) {

            req.error = error.code;

            return logout(req, res);
        }

        throw error;
    }
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