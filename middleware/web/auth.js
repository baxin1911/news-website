import { verifyAccessToken } from "../../config/jwt.js";

export const verifyToken = (req, res, next) => {

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