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