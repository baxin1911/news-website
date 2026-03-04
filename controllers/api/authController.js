import { successCodeMessages } from "../../messages/codeMessages.js";
import { clearAuthCookies, setAuthCookies } from "../../utils/cookiesUtils.js";
import { editPasswordByUserId } from "../../services/userService.js";
import { getNewRefreshToken, getLoginToken, recover, register } from "../../services/authService.js";
import { DetectedReuseError, InvalidAuthError } from "../../errors/authError.js";

export const loginAccount = async (req, res) => {

    const tokens = await getLoginToken(req.body);

    setAuthCookies(res, tokens.newAccessToken, tokens.newRefreshToken);

    return res.status(200).json({ code: successCodeMessages.SUCCESS_LOGIN });
}

export const registerAccount = async (req, res) => {

    const result = register(req.body);

    return res.status(201).json(result);
}

export const recoverAccount = async (req, res) => {

    const result = await recover(req.body);

    return res.status(200).json(result);
}

export const resetPassword = async (req, res) => {

    const { password } = req.body || {};
    const { id } = req || {};

    const isSaved = await editPasswordByUserId(id, password);

    return res.status(200).json({ code: successCodeMessages.UPDATED_RESET_PASSWORD, isSaved });
}

export const refreshAuthToken = async (req, res) => {

    try {

        const { refreshToken } = req.cookies;
        const  tokens = await getNewRefreshToken(refreshToken);

        setAuthCookies(res, tokens.newAccessToken, tokens.newRefreshToken);

        return res.sendStatus(200);

    } catch (error) {

        if (error instanceof InvalidAuthError || error instanceof DetectedReuseError) {

            clearAuthCookies(res);

            return res.status(error.status).json({ code: error.code });
        }

        throw error;
    }
}