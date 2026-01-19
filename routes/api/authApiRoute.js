import express from 'express';
import { verifyApiResetToken, verifyAuthTokenOptional } from '../../middleware/authMiddleware.js';
import { login, recoverAccount, refreshAuthToken, registerAccount, resetPassword } from '../../controllers/api/authController.js';
import { authRegisterValidation, loginValidation } from '../../validators/forms/authValitdations.js';
import { emailValidation, passwordValidation } from '../../validators/forms/validations.js';
import { validate, validateLogin } from '../../middleware/validatorMiddleware.js';
// import { emailLimiter, loginLimiter, recoverLimiter, registerLimiter, resetLimiter } from '../../middleware/rateLimit.js';

const router = express.Router();

router.post(
    '/login', 
    verifyAuthTokenOptional({ source: 'cookies' }), 
    loginValidation, 
    validateLogin, 
    login
);

router.post(
    '/register', 
    verifyAuthTokenOptional({ source: 'cookies' }), 
    authRegisterValidation, 
    validate, 
    registerAccount
);

router.post(
    '/recover', 
    verifyAuthTokenOptional({ source: 'cookies' }), 
    emailValidation, 
    validate, 
    recoverAccount
);

router.post(
    '/refresh', 
    refreshAuthToken
);

router.patch(
    '/reset', 
    verifyApiResetToken, 
    passwordValidation, 
    validate, 
    resetPassword
);

export default router;