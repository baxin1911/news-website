import { successCodeMessages } from "../../messages/codeMessages.js";
import { clearAuthCookies, setAuthCookies } from "../../utils/cookiesUtils.js";
import { editPasswordByUserId } from "../../services/userService.js";
import { getNewRefreshToken, getLoginToken, recover, register } from "../../services/authService.js";

export const loginAccount = async (req, res) => {

    const result = await getLoginToken(req.body);

    if (result.error) return res.status(401).json({ code: result.error });

    setAuthCookies(res, result.newAccessToken, result.newRefreshToken);

    return res.status(200).json({ code: successCodeMessages.SUCCESS_LOGIN });
}

export const registerAccount = async (req, res) => {

    const result = register(req.body);

    return res.status(201).json({ code: result.code });
}

export const recoverAccount = async (req, res) => {

    const result = await recover(req.body);

    return res.status(200).json({ code: result.code });
}

export const resetPassword = async (req, res) => {

    const { password } = req.body || {};
    const { id } = req || {};

    await editPasswordByUserId(id, password);

    return res.status(200).json({ code: successCodeMessages.UPDATED_RESET_PASSWORD });
}

export const refreshAuthToken = async (req, res) => {

    const { refreshToken } = req.cookies;
    const  result = await getNewRefreshToken(refreshToken);

    if (result.error) {
        
        clearAuthCookies(res);

        return res.status(401).json({ code: result.error });
    }

    setAuthCookies(res, result.newAccessToken, result.newRefreshToken);

    return res.sendStatus(200);
}