import express from 'express';
import { verifyApiResetToken } from '../../middleware/auth.js';
import { generateAccessToken, verifyAccessToken } from '../../config/jwt.js';
import { loginController, recoverAccountController, registerController, resetPasswordController } from '../../controllers/api/authController.js';
import { validateEmail, validatePassowrd, validateRepeatedPassowrd, validateUsername } from '../../helpers/validations/auth.js';
// import { emailLimiter, loginLimiter, recoverLimiter, registerLimiter, resetLimiter } from '../../middleware/rateLimit.js';

const router = express.Router();

router.post('/login',(req, res, next) => {

    const { email, password } = req.body || {};
    const emailError = validateEmail(email);
    const passwordError = validatePassowrd(password);

    if (emailError || passwordError) return res.status(401).json({ 
        message: 'Correo o contraseña incorrecto.' 
    });

    next();

}, loginController);

router.post('/register', (req, res, next) => {

    const { email, password, repeatedPassword, username } = req.body || {};
    const errors = {
        emailError: validateEmail(email),
        passwordError: validatePassowrd(password),
        repeatedPasswordError: validateRepeatedPassowrd(password, repeatedPassword),
        usernameError: validateUsername(username)
    };
    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return res.status(400).json({ errors, message: 'Errores de validación' });

    next();

}, registerController);

router.post('/recover', (req, res, next) => {

    const { email } = req.body || {};

    const errors = { emailError: validateEmail(email) };
    
    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return res.status(400).json({ errors, message: 'Errores de validación' });

    next();

}, recoverAccountController);

router.post('/refresh', async (req, res) => {

    const { token } = req.body || {};

    if (!token) return res.status(401).json({ message: 'Refresh token requerido' });

    //verify refresh in BD

    const user = verifyAccessToken(token);

    if (!user) return res.status(403).json({ message: 'Refresh token expirado o inválido' });

    const accessToken = generateAccessToken(user);

    return res.json({ accessToken });
});

router.patch('/reset', verifyApiResetToken, (req, res, next) => {

    const { password, repeatedPassword } = req.body || {};
    const errors = { 
        passwordError: validatePassowrd(password),
        repeatedPasswordError: validateRepeatedPassowrd(password, repeatedPassword),
    };
    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return res.status(400).json({ errors, message: 'Errores de validación' });

    next();
}, resetPasswordController);

export default router;