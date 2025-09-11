import { verifyAccessToken } from "../config/jwt.js";

export const authToken = (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({
        message: 'Token requerido'
    });

    const token = authorization.split(' ')[1];
    const user = verifyAccessToken(token);

    if (!user) return res.status(403).json({ message: 'Token inválido' });

    req.user = user

    next();
}

export const checkToken = (req, res, next) => {

    const { accessToken } = req.cookies;

    if (!accessToken) return res.redirect('/');

    const user = verifyAccessToken(accessToken);

    if (!user) return res.redirect('/');

    req.user = user;

    next();
}

export const checkContentType = (req, res, next) => {

    const contentType = req.headers['content-type'];

    if (!contentType || !contentType.includes('application/json')) {

        return res.status(415).json({
            error: 'El Content-Type requiere application/json.'
        });
    }

    next();
}