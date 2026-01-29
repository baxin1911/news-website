import { createUserPreferencesDtoForUpdate } from '../../dtos/preferencesDTO.js';
import { createProfileDtoForUpdate } from '../../dtos/profileDTO.js';
import { errorCodeMessages, successCodeMessages } from '../../messages/codeMessages.js';
import { processAvatarImage, processCoverImage } from '../../services/imageService.js';
import { editPasswordByUserId, editProfileInfoByUserId, editUsernameByUserId, editUserPreferencesByUserId, saveUserPreferences } from '../../services/userService.js';
import { clearAuthCookies } from '../../utils/cookiesUtils.js';
import { avatarsDir, coversDir, getBaseDir, sanitizePath } from '../../utils/pathsUtils.js';

export const updateProfileAccount = async (req, res) => {

    const { body, user } = req || {};
    const { username, avatarPath, coverPath } = body || {};
    const userId = user.id;
    let newAvatarPath = null;
    let newCoverPath = null;

    // if (result.error) return res.status(500).json({ message: result.error });
    //429, 500

    if (avatarPath) {

        const sanitizedPath = sanitizePath(avatarPath);
        const baseDir = getBaseDir(sanitizedPath);
        const mode = baseDir === 'temp' ? 'create' : (baseDir === 'avatars' ? 'update' : null);
        const result = await processAvatarImage(sanitizedPath, avatarsDir, userId, mode);

        if (result === -1) return res.status(400).json({ code: errorCodeMessages.INVALID_IMAGE_PATH });

        if (result === -2) return res.status(409).json({ code: errorCodeMessages.UNAUTH_USER_EDIT_FILE });

        if (result === -3) return res.status(500).json({ code: errorCodeMessages.FILE_NOT_FOUND });

        if (result === -4) return res.status(500).json({ code: errorCodeMessages.INVALID_FILE });

        if (result === -5) return res.status(500).json({ code: errorCodeMessages.SERVER_ERROR });

        newAvatarPath = result;
    }

    if (coverPath) {

        const sanitizedPath = sanitizePath(coverPath);
        const baseDir = getBaseDir(sanitizedPath);
        const mode = baseDir === 'temp' ? 'create' : (baseDir === 'covers' ? 'update' : null);
        const result = await processCoverImage(sanitizedPath, coversDir, userId, mode);

        if (result === -1) return res.status(400).json({ code: errorCodeMessages.INVALID_IMAGE_PATH });

        if (result === -2) return res.status(409).json({ code: errorCodeMessages.UNAUTH_USER_EDIT_FILE });

        if (result === -3) return res.status(500).json({ code: errorCodeMessages.FILE_NOT_FOUND });

        if (result === -4) return res.status(500).json({ code: errorCodeMessages.INVALID_FILE });

        if (result === -5) return res.status(500).json({ code: errorCodeMessages.SERVER_ERROR });

        newCoverPath = result;
    }

    await editUsernameByUserId(userId, username);

    body.avatarPath = newAvatarPath;
    body.coverPath = newCoverPath;
    const profileDto = createProfileDtoForUpdate(body);

    await editProfileInfoByUserId(profileDto, userId);

    return res.status(200).json({ code: successCodeMessages.UPDATED_ACCOUNT });
}

export const updateProfileAccountPassword = async (req, res) => {

    const { password } = req.body || {};
    const { user } = req;

    await editPasswordByUserId(user.id, password);

    // if (result.error) return res.status(500).json({ message: result.error });

    //429, 500

    clearAuthCookies(res);

    return res.status(200).json({ code: successCodeMessages.UPDATED_ACCOUNT_PASSWORD });
}

export const updateProfilePreferences = async (req, res) => {

    const { body, user } = req || {};
    const preferencesDto = createUserPreferencesDtoForUpdate(body);
    
    await editUserPreferencesByUserId(preferencesDto, user.id);

    // if (result.error) return res.status(500).json({ message: result.error });

    //429, 500
    
    return res.status(200).json({ code: successCodeMessages.UPDATED_PREFERENCES });
}