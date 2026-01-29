import { createUserDtoForToken } from "../dtos/userDTO.js";
import { errorCodeMessages } from "../messages/codeMessages.js";
import { encryptToken } from "../utils/encryptionUtils.js";
import { generateAccessToken, generateRefreshToken, tokenStore, verifyRefreshToken } from "./jwtService.js";

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