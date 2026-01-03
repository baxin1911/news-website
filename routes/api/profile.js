import express from 'express';
import { validateDisplayName, validateLastName, validateName, validatePassword } from '../../helpers/validations/user.js';
import { validateRepeatedPassword } from '../../helpers/validations/auth.js';
import { verifyCookiesAuthTokenRequired } from '../../middleware/auth.js';
import { updateProfileAccountController, updateProfilePasswordController, updateProfilePreferencesController } from '../../controllers/api/profileController.js';
import { validateBooleanField } from '../../helpers/validations/preferences.js';

const router = express.Router();

router.put('/account', verifyCookiesAuthTokenRequired, (req, res, next) => {

    const { displayName, profilePicture, coverPicture, name, lastName } = req.body || {};
    const errors = {
        displayNameError: validateDisplayName(displayName),
        nameError: validateName(name),
        lastNameError: validateLastName(lastName),
        profilePictureError: null,
        coverPictureError: null
    };
    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return res.status(400).json({ errors, message: 'Errores de validación' });

    next();

}, updateProfileAccountController);

router.patch('/security/password', verifyCookiesAuthTokenRequired, (req, res, next) => {

    const { password, repeatedPassword } = req.body || {};
    const errors = {
        passwordError: validatePassword(password),
        repeatedPasswordError: validateRepeatedPassword(password, repeatedPassword)
    };
    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return res.status(400).json({ errors, message: 'Errores de validación' });

    next();

}, updateProfilePasswordController);

router.patch('/preferences', verifyCookiesAuthTokenRequired, (req, res, next) => {

    const { commentNotifications, followingNotifications, newsletterNotifications } = req.body || {};
    const errors = {
        commentNotificationsError: validateBooleanField(commentNotifications),
        followingNotificationsError: validateBooleanField(followingNotifications),
        newsletterNotificationsError: validateBooleanField(newsletterNotifications)
    };
    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return res.status(400).json({ errors, message: 'Errores de validación' });

    next();

}, updateProfilePreferencesController);

export default router;