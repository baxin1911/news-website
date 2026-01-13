import express from 'express';
import { verifyApiResetToken } from '../../middleware/authMiddleware.js';
import { generateAccessToken, verifyAccessToken } from '../../services/jwtService.js';
import { login, recoverAccount, registerAccount, resetPassword } from '../../controllers/api/authController.js';
import { authRegisterValidation, loginValidation } from '../../validators/forms/authValitdations.js';
import { emailValidation, passwordValidation } from '../../validators/forms/validations.js';
import { validate, validateLogin } from '../../middleware/validatorMiddleware.js';
// import { emailLimiter, loginLimiter, recoverLimiter, registerLimiter, resetLimiter } from '../../middleware/rateLimit.js';

const router = express.Router();

router.post(
    '/login', 
    loginValidation, 
    validateLogin, 
    login
);

router.post(
    '/register', 
    authRegisterValidation, 
    validate, 
    registerAccount
);

router.post(
    '/recover', 
    emailValidation, 
    validate, 
    recoverAccount
);

router.post('/refresh', async (req, res) => {

    const { token } = req.body || {};

    if (!token) return res.status(401).json({ message: 'Refresh token requerido' });

    //verify refresh in BD

    const user = verifyAccessToken(token);

    if (!user) return res.status(403).json({ message: 'Refresh token expirado o inválido' });

    const accessToken = generateAccessToken(user);

    return res.json({ accessToken });
});

router.patch(
    '/reset', 
    verifyApiResetToken, 
    passwordValidation, 
    validate, 
    resetPassword
);

export default router;