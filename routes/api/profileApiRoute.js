import express from 'express';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';
import { updateProfileAccountController, updateProfileAccountPasswordController, updateProfilePreferencesController } from '../../controllers/api/profileController.js';
import { passwordValidation } from '../../validators/forms/validations.js';
import { validate } from '../../middleware/validatorMiddleware.js';
import { preferencesValitdation, profileValidation } from '../../validators/forms/profileValidations.js';

const router = express.Router();

router.put(
    '/account', 
    verifyCookiesAuthTokenRequired, 
    profileValidation, 
    validate,
    updateProfileAccountController
);

router.patch(
    '/security/password', 
    verifyCookiesAuthTokenRequired, 
    passwordValidation,
    validate, 
    updateProfileAccountPasswordController
);

router.patch(
    '/preferences', 
    verifyCookiesAuthTokenRequired, 
    preferencesValitdation,
    validate,
    updateProfilePreferencesController
);

export default router;