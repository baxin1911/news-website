import { updateProfileInfo, updateProfilePreferences } from '../../services/profileService.js';

export const updateProfileAccountController = async (req, res) => {
    const { displayName, profilePicture, coverPicture, name, lastName } = req.body || {};
    const user = req.user;
    // update profile

    const result = await updateProfileInfo(displayName, profilePicture, coverPicture, name, lastName, user.id);
    // if (result.error) return res.status(500).json({ message: result.error });
    //429, 500

    return res.status(200).json({ message: '¡Cuenta actualizada con éxito!' });
}

export const updateProfilePasswordController = async (req, res) => {
    const { password } = req.body || {};
    const user = req.user;

    // update password

    // const result = await updatePassword(password);

    // if (result.error) return res.status(500).json({ message: result.error });

    //429, 500

    return res.status(200).json({ message: '¡Contraseña actualizada con éxito!' });
}

export const updateProfilePreferencesController = async (req, res) => {
    const { commentNotifications, followingNotifications, newsletterNotifications } = req.body || {};
    const user = req.user;

    // update profile
    const result = await updateProfilePreferences(commentNotifications, followingNotifications, newsletterNotifications, user.id);

    // if (result.error) return res.status(500).json({ message: result.error });

    //429, 500

    return res.status(200).json({ message: 'Preferencias actualizadas con éxito!' });
}