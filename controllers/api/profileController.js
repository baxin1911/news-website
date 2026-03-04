import { createUserPreferencesDtoForUpdate } from '../../dtos/preferencesDTO.js';
import { successCodeMessages } from '../../messages/codeMessages.js';
import { editUserPreferencesByUserId } from '../../services/preferencesService.js';
import { editProfileAccount } from '../../services/profileService.js';
import { editPasswordByUserId } from '../../services/userService.js';
import { clearAuthCookies } from '../../utils/cookiesUtils.js';

export const updateProfileAccount = async (req, res) => {
    
    const result = await editProfileAccount(req.user.id, req.body);

    return res.status(200).json(result);
}

export const updateProfileAccountPassword = async (req, res) => {

    const isSaved = await editPasswordByUserId(req.user.id, req.body.password);

    clearAuthCookies(res);

    return res.status(200).json({ 
        code: successCodeMessages.UPDATED_ACCOUNT_PASSWORD, 
        isSaved 
    });
}

export const updateProfilePreferences = async (req, res) => {

    const preferencesDto = createUserPreferencesDtoForUpdate(req.body);
    
    const isUpdated = await editUserPreferencesByUserId(preferencesDto, req.user.id);
    
    return res.status(200).json({ 
        code: successCodeMessages.UPDATED_PREFERENCES, 
        isUpdated 
    });
}