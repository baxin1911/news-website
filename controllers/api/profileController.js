import { errorCodeMessages, successCodeMessages } from '../../messages/codeMessages.js';
import { processAvatarTempImage, processCoverTempImage } from '../../services/imageService.js';
import { editProfileInfo, editProfilePreferences } from '../../services/profileService.js';
import { clearAuthCookies } from '../../utils/cookiesUtils.js';
import { avatarsDir, coversDir } from '../../utils/pathsUtils.js';

export const updateProfileAccount = async (req, res) => {
    const { username, avatarPath, coverPath, name, lastName } = req.body || {};
    const user = req.user;
    // update profile

    const result = await editProfileInfo(username, name, lastName, user.id);
    // if (result.error) return res.status(500).json({ message: result.error });
    //429, 500

    if (avatarPath) {
        
        const result = processAvatarTempImage(avatarPath, avatarsDir);

        if (result === -1) return res.status(500).json({ code: errorCodeMessages.FILE_NOT_FOUND });

        if (result === -2) return res.status(400).json({ code: errorCodeMessages.INVALID_IMAGE_PATH });

        if (result === -3) return res.status(500).json({ code: errorCodeMessages.INVALID_FILE });

        if (result === -4) return res.status(409).json({ code: errorCodeMessages.UNAUTH_USER_EDIT_FILE });

        if (result === -5) return res.status(500).json({ code: errorCodeMessages.SERVER_ERROR });
    }

    if (coverPath) {

        const result = processCoverTempImage(coverPath, coversDir);

        if (result === -1) return res.status(500).json({ code: errorCodeMessages.FILE_NOT_FOUND });

        if (result === -2) return res.status(400).json({ code: errorCodeMessages.INVALID_IMAGE_PATH });

        if (result === -3) return res.status(500).json({ code: errorCodeMessages.INVALID_FILE });

        if (result === -4) return res.status(409).json({ code: errorCodeMessages.UNAUTH_USER_EDIT_FILE });

        if (result === -5) return res.status(500).json({ code: errorCodeMessages.SERVER_ERROR });
    }

    return res.status(200).json({ code: successCodeMessages.UPDATED_ACCOUNT });
}

export const updateProfileAccountPassword = async (req, res) => {
    const { password } = req.body || {};
    const user = req.user;

    // update password

    // const result = await updatePassword(password);

    // if (result.error) return res.status(500).json({ message: result.error });

    //429, 500

    clearAuthCookies(res);

    return res.status(200).json({ code: successCodeMessages.UPDATED_ACCOUNT_PASSWORD });
}

export const updateProfilePreferences = async (req, res) => {
    const { commentNotifications, followingNotifications, newsletterNotifications } = req.body || {};
    const user = req.user;

    // update profile
    const result = await editProfilePreferences(commentNotifications, followingNotifications, newsletterNotifications, user.id);

    // if (result.error) return res.status(500).json({ message: result.error });

    //429, 500

    return res.status(200).json({ code: successCodeMessages.UPDATED_PREFERENCES });
}