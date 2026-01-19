import { tokenStore, generateAccessToken, generateOneTimeToken, generateRefreshToken, verifyRefreshToken } from "../../services/jwtService.js";
import { errorCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";
import { encryptPassword, encryptToken } from "../../utils/encryptionUtils.js";
import { sendEmail } from "../../utils/emailUtils.js";
import { clearAuthCookies, setAuthCookies } from "../../utils/cookiesUtils.js";
import { createProfile } from "../../services/profileService.js";

export const login = async (req, res) => {

    const { email, password } = req.body || {};

    // Get user and verify token
    // const result = await login(email, password);

    // if (result.error) return res.status(500).json({ message: result.error });

    // 429, 500

    const user = {
        id: 1,
        email,
        emailVerified: true,
        username: 'dersey',
        code: 'AA000001',
        role: 1,
        avatarPath: '/img/ejemplo.png',
        coverPath: null,
        totalPosts: 0,
        totalTopics: 0,
        totalAuthors: 0,
        followers: 0
    };
    const newRefreshToken = generateRefreshToken(user);
    const newAccessToken = generateAccessToken(user);
    const hashedToken = encryptToken(newRefreshToken);

    // Save refreshToken in DB
    await createProfile(user);
    tokenStore.hashedRefreshToken = hashedToken;
    setAuthCookies(res, newAccessToken, newRefreshToken);

    return res.status(200).json({ code: successCodeMessages.SUCCESS_LOGIN });
}

export const registerAccount = async (req, res) => {

    const { email, password, username } = req.body || {};
    const hashPassword = await encryptPassword(password);

    // Save user and show errors for duplicate information
    // const result = await registerUser(username, email, hashPassword);

    // if (result.error) return res.status(500).json({ message: result.error });

    // 409, 429, 500

    const user = { id: 1 }
    const token = generateOneTimeToken(user, 'email-verify');
    const verifyLink = `http://localhost:3000/auth/email-verify?token=${token}`;

    await sendEmail(email, 'Verifica tu correo', `
        <p>Has clic en el enlace para activar tu cuenta:</p>
        <a href="${ verifyLink }">${ verifyLink }</a>
    `);

    return res.status(201).json({ code: successCodeMessages.CREATED_ACCOUNT });
}

export const recoverAccount = async (req, res) => {

    const { email } = req.body || {};

    // Search email and idUser
    // const result = await recoverAccount(email);

    // if (result.error) return res.status(500).json({ message: result.error });

    //429, 500

    const user = { id: 1 };
    const token = generateOneTimeToken(user, 'password-reset');
    const resetLink = `http://localhost:3000/auth/password-reset?token=${token}`;
    await sendEmail(email, 'Restablece tu contraseña', `
        <p>Has clic en el enlace para restablecer tu contrsaeña:</p>
        <a href="${ resetLink }">${ resetLink }</a>
    `);

    return res.status(200).json({ code: successCodeMessages.SENDED_RECOVER_EMAIL });
}

export const refreshAuthToken = async (req, res) => {

    const { refreshToken } = req.cookies;

    if (!refreshToken) return res.status(401).json({ code: errorCodeMessages.INVALID_AUTH });

    const hashedToken = encryptToken(refreshToken);

    const existsToken = hashedToken === tokenStore.hashedRefreshToken;

    if (!existsToken) {

        tokenStore.hashedRefreshToken = null;
        clearAuthCookies(res);

        return res.status(401).json({ code: errorCodeMessages.DETECTED_REUSE });
    }

    const tokenInfo = verifyRefreshToken(refreshToken);

    if (!tokenInfo) return res.status(401).json({ code: errorCodeMessages.INVALID_AUTH });

    const newAccessToken = generateAccessToken(tokenInfo);
    const newRefreshToken = generateRefreshToken(tokenInfo);

    setAuthCookies(res, newAccessToken, newRefreshToken);

    return res.sendStatus(200);
}

export const resetPassword = async (req, res) => {

    const { password } = req.body || {};
    const { id } = req || {};

    // Update password and verify errors and token
    // const result = await resetPassword(password, id);

    // if (result.error) return res.status(500).json({ message: result.error });

    //401, 403, 404, 429, 500

    return res.status(200).json({ code: successCodeMessages.UPDATED_RESET_PASSWORD });
}