import express from 'express';
import { verifyApiTokenRequired } from '../../middleware/authMiddleware.js';
import { updateProfileAccount, updateProfileAccountPassword, updateProfilePreferences } from '../../controllers/api/profileController.js';
import { passwordValidation } from '../../validators/forms/validations.js';
import { validate } from '../../middleware/validatorMiddleware.js';
import { preferencesValitdation, profileValidation } from '../../validators/forms/profileValidations.js';

const router = express.Router();

router.put(
    '/account', 
    verifyApiTokenRequired, 
    profileValidation, 
    validate,
    updateProfileAccount
);

router.patch(
    '/security/password', 
    verifyApiTokenRequired, 
    passwordValidation,
    validate, 
    updateProfileAccountPassword
);

router.patch(
    '/preferences', 
    verifyApiTokenRequired, 
    preferencesValitdation,
    validate,
    updateProfilePreferences
);

export default router;