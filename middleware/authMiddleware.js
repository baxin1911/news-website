import { verifyAccessToken, verifyOneTimeToken } from "../services/jwtService.js";
import { errorCodeMessages } from "../messages/codeMessages.js";
import { errorMessages } from "../messages/messages.js";
import { redirectWithFlash } from "../utils/flashUtils.js";
import { clearAuthCookies } from "../utils/cookiesUtils.js";

const getAuthTokenInfo = ( req, res) => {

    const { accessToken } = req.cookies;

    if (!accessToken) {
        
        clearAuthCookies(res);
        return null;
    }

    const tokenInfo = verifyAccessToken(accessToken);

    if (!tokenInfo) {

        clearAuthCookies(res);
        return null;
    }

    return tokenInfo;
}

export const verifyCookiesAuthTokenRequired = (req, res, next) => {

    const tokenInfo = getAuthTokenInfo(req, res);

    if (!tokenInfo) {
        
        res.cookie('returnTo', req.originalUrl, { httpOnly: true });

        return res.redirect('/auth/refresh');
    }

    req.user = tokenInfo;
    next();
}

export const verifyApiTokenRequired = (req, res, next) => {

    const tokenInfo = getAuthTokenInfo(req, res);

    if (!tokenInfo) return res.status(401).json({ code: errorCodeMessages.AUTH_INVALID });

    req.user = tokenInfo;
    next();
}

export const verifyAuthTokenOptional = ({ source }) => {

    return (req, res, next) => {

        let accessToken = null;

        if (source === 'cookies') ({ accessToken } = req.cookies);
        if (source === 'headers') accessToken = req.headers.authorization?.split(' ')[1];

        let tokenInfo = null;

        if (accessToken) {

            tokenInfo = verifyAccessToken(accessToken);

            if (!tokenInfo) {

                res.clearCookie('accessToken');

                return next();
            }
        }

        req.user = tokenInfo;
        next();
    }
}

const getOneTimeTokenInfo = (token, type) => {

    if (!token) return null;

    const tokenInfo = verifyOneTimeToken(token);

    if (!tokenInfo) return null;

    const { id, purpose } = tokenInfo;

    if (!id) return null;
    if (!purpose || purpose !== type) return null;

    return tokenInfo;
}

export const verifyWebResetToken = (req, res, next) => {

    const { token } = req.query;
    const tokenInfo = getOneTimeTokenInfo(token, 'password-reset');

    if (!tokenInfo) return redirectWithFlash(
        res, 
        errorMessages.LINK_INVALID, 
        errorCodeMessages.LINK_INVALID, 
        'error'
    );

    req.token = token;
    next();
}

export const verifyApiResetToken = (req, res, next) => {

    const { token } = req.body || {};
    
    const tokenInfo = getOneTimeTokenInfo(token, 'password-reset');

    if (!tokenInfo) return res.status(401).json({ message: errorMessages.LINK_INVALID });

    req.id = tokenInfo.id;
    next();
}

export const verifyWebEmailToken = (req, res, next) => {

    const { token } = req.query;
    const tokenInfo = getOneTimeTokenInfo(token, 'email-verify');

    if (!tokenInfo) return redirectWithFlash(
        res, 
        errorMessages.LINK_INVALID, 
        errorCodeMessages.LINK_INVALID, 
        'error'
    );

    req.id = tokenInfo.id;
    next();
}