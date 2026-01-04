import { verifyAccessToken, verifyOneTimeToken } from "../config/jwtlConfig.js";
import { messages } from "../config/messagesConfig.js";
import { redirectWithFlash } from "../utils/flashUtils.js";

export const verifyCookiesAuthTokenRequired = (req, res, next) => {

    const { accessToken } = req.cookies;

    if (!accessToken) {
        
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return redirectWithFlash(res, messages.AUTH_INVALID, 'AUTH_INVALID', 'error');
    }

    const user = verifyAccessToken(accessToken);

    if (!user) {

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return redirectWithFlash(res, messages.AUTH_INVALID, 'AUTH_INVALID', 'error');
    }

    req.user = user;

    next();
}

export const verifyCookiesAuthTokenOptional = (req, res, next) => {

    const { accessToken } = req.cookies;
    let user = null;

    if (accessToken) {

        user = verifyAccessToken(accessToken);

        if (!user) {

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            return redirectWithFlash(res, messages.AUTH_INVALID, 'AUTH_INVALID', 'error');
        }
    }

    req.user = user;

    next();

}

export const verifyApiResetToken = (req, res, next) => {

    const { token } = req.body || {};
    
    const tokenInfo = verifyOneTimeToken(token);

    if (!tokenInfo) return res.status(403).json({ message: 'Enlace inválido.' });

    const { id, purpose } = tokenInfo;

    if (!purpose || purpose !== 'password-reset') return res.status(403).json({ 
        message: 'Enlace inválido.' 
    });

    if (!id) return res.status(401).json({ message: 'Enlace inválido.' });

    req.id = id;

    next();
}

export const verifyWebResetToken = (req, res, next) => {

    const { token } = req.query;
    const tokenInfo = verifyOneTimeToken(token);

    if (!tokenInfo) return redirectWithFlash(res, messages.LINK_INVALID, 'LINK_INVALID', 'error');

    const { id, purpose } = tokenInfo;

    if (!purpose || purpose !== 'password-reset')  return redirectWithFlash(res, messages.LINK_INVALID, 'LINK_INVALID', 'error');
    if (!id)  return redirectWithFlash(res, messages.LINK_INVALID, 'LINK_INVALID', 'error');

    req.token = token;

    next();
}

export const verifyWebEmailToken = (req, res, next) => {

    const { token } = req.query;
    const tokenInfo = verifyOneTimeToken(token);

    if (!tokenInfo)  return redirectWithFlash(res, messages.LINK_INVALID, 'LINK_INVALID', 'error');

    const { id, purpose } = tokenInfo;

    if (!purpose || purpose !== 'email-verify')  return redirectWithFlash(res, messages.LINK_INVALID, 'LINK_INVALID', 'error');
    if (!id)  return redirectWithFlash(res, messages.LINK_INVALID, 'LINK_INVALID', 'error');

    req.id = id;

    next();
}