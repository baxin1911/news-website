import { verifyAccessToken, verifyOneTimeToken } from "../config/jwt.js";

export const verifyCookiesAuthTokenRequired = (req, res, next) => {

    const { accessToken } = req.cookies;

    if (!accessToken) return res.redirect('/?loginError=session');

    const user = verifyAccessToken(accessToken);

    if (!user) {

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        
        return res.redirect('/?loginError=session');
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

            return res.redirect('/?loginError=session');
        }
    }

    req.user = user;

    next();

}

export const verifyApiResetToken = (req, res, next) => {

    const { token } = req.body || {};
    
    const tokenInfo = verifyOneTimeToken(token);

    if (!tokenInfo) return res.status(403).json({ message: 'Token inválido' });

    const { id, purpose } = tokenInfo;

    if (!purpose || purpose !== 'password-reset') return res.status(403).json({ 
        message: 'Propósito incorrecto' 
    });

    if (!id) return res.status(401).json({ message: 'Usuario no identificado' });

    req.id = id;

    next();
}

export const verifyWebResetToken = (req, res, next) => {

    const { token } = req.query;
    const tokenInfo = verifyOneTimeToken(token);

    if (!tokenInfo) return res.redirect('/?resetError=token');

    const { id, purpose } = tokenInfo;

    if (!purpose || purpose !== 'password-reset') return res.redirect('/?resetError=purpose');

    if (!id) return res.redirect('/?resetError=user');

    req.token = token;

    next();
}

export const verifyWebEmailToken = (req, res, next) => {

    const { token } = req.query;
    const tokenInfo = verifyOneTimeToken(token);

    if (!tokenInfo) return res.redirect('/?emailVerifyError=token');

    const { id, purpose } = tokenInfo;

    if (!purpose || purpose !== 'email-verify') return res.redirect('/?emailVerifyError=purpose');

    if (!id) return res.redirect('/?emailVerifyError=user');

    req.id = id;

    next();
}