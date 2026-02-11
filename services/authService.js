import { createUserPreferencesDtoForRegister } from "../dtos/preferencesDTO.js";
import { createProfileDtoForGoogleAuth } from "../dtos/profileDTO.js";
import { createUserDtoForToken, createUserDtoFromGoogle } from "../dtos/userDTO.js";
import { errorCodeMessages, successCodeMessages } from "../messages/codeMessages.js";
import { sendEmail } from "../utils/emailUtils.js";
import { encryptToken } from "../utils/encryptionUtils.js";
import { downloadGoogleAvatar } from "./googleService.js";
import { generateAccessToken, generateOneTimeToken, generateRefreshToken, tokenStore, verifyRefreshToken } from "./jwtService.js";
import { getUserByEmail, getRoleByUserId, saveProfile, saveUser, saveUserPreferences, getUserIdByEmail, verifyPassword } from "./userService.js";

export const register = async (body) => {

    const userId = await saveUser(body);
    await saveProfile({ userId });
    await saveUserPreferences(userId);

    const token = generateOneTimeToken(userId, 'email-verify');
    const verifyLink = `http://localhost:3000/auth/email-verify?token=${token}`;

    await sendEmail(body.email, 'Verifica tu correo', `
        <p>Has clic en el enlace para activar tu cuenta:</p>
        <a href="${ verifyLink }">${ verifyLink }</a>
    `);

    return { code: successCodeMessages.CREATED_ACCOUNT };
}

export const recover = async (body) => {

    const { email } = body;

    const userId = await getUserIdByEmail(email);

    if (!userId) return { code: successCodeMessages.SENDED_RECOVER_EMAIL };
        
    const token = generateOneTimeToken(userId, 'password-reset');
    const resetLink = `http://localhost:3000/auth/password-reset?token=${token}`;

    await sendEmail(email, 'Restablece tu contraseña', `
        <p>Has clic en el enlace para restablecer tu contrsaeña:</p>
        <a href="${ resetLink }">${ resetLink }</a>
    `);

    return { code: successCodeMessages.SENDED_RECOVER_EMAIL };
}

export const getAuthToken = async (body) => {

    const userId = await getUserIdByEmail(body.email);
    
    if (!userId) return { error: errorCodeMessages.LOGIN_ERROR };

    const isValid = await verifyPassword(userId, body.password);

    if (!isValid) return { error: errorCodeMessages.LOGIN_ERROR };
    
    const role = await getRoleByUserId(userId);

    const tokenDto = createUserDtoForToken(userId, role.name);
    const newRefreshToken = generateRefreshToken(tokenDto);
    const newAccessToken = generateAccessToken(tokenDto);
    const hashedToken = encryptToken(newRefreshToken);

    // Save refreshToken in DB
    tokenStore.hashedRefreshToken = hashedToken;

    return {
        newAccessToken,
        newRefreshToken
    };
}

export const getNewRefreshToken = async (refreshToken) => {

    if (!refreshToken) return { error: errorCodeMessages.INVALID_AUTH };

    const hashedToken = encryptToken(refreshToken);

    const existsToken = hashedToken === tokenStore.hashedRefreshToken;

    if (!existsToken) {

        tokenStore.hashedRefreshToken = null;

        return { error: errorCodeMessages.DETECTED_REUSE };
    }

    const tokenInfo = verifyRefreshToken(refreshToken);

    if (!tokenInfo) return { error: errorCodeMessages.INVALID_AUTH };

    const { id, role } = tokenInfo;
    const tokenDto = createUserDtoForToken(id, role);
    const newAccessToken = generateAccessToken(tokenDto);
    const newRefreshToken = generateRefreshToken(tokenDto);

    return {
        newAccessToken,
        newRefreshToken
    };
}

export const googleLogin = async (profile) => {

    const data = profile._json;
    const email = data.email;

    let user = await getUserByEmail(email);

    if (!user) {

        const userDto = createUserDtoFromGoogle(data);

        const userId = await saveUser(userDto);
        const avatarPath = await downloadGoogleAvatar(data.picture, userId);

        const profileDto = createProfileDtoForGoogleAuth(data, profile.provider);
        profileDto.avatarPath = avatarPath;
        profileDto.userId = userId;

        await saveProfile(profileDto);

        const preferencesDto = createUserPreferencesDtoForRegister(userId);

        await saveUserPreferences(preferencesDto);
        user = await getUserByEmail(email);
    }

    const role = await getRoleByUserId(user.id);

    const tokenDto = createUserDtoForToken(user.id, role.name);

    return tokenDto;
}