import { createUserPreferencesDtoForRegister } from "../dtos/preferencesDTO.js";
import { createProfileDtoForGoogleAuth } from "../dtos/profileDTO.js";
import { createUserDtoForToken, createUserDtoFromGoogle } from "../dtos/userDTO.js";
import { errorCodeMessages } from "../messages/codeMessages.js";
import { encryptToken } from "../utils/encryptionUtils.js";
import { downloadGoogleAvatar } from "./googleService.js";
import { generateAccessToken, generateRefreshToken, tokenStore, verifyRefreshToken } from "./jwtService.js";
import { getUserByEmail, getRoleByUserId, saveProfile, saveUser, saveUserPreferences } from "./userService.js";

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