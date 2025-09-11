import express from 'express';
import { login, recoverAccount, registerUser, resetPassword } from '../../controllers/authController.js';
import { generateAccessToken, generateRefreshToken, generateResetToken, generateVerifyEmailToken, verifyAccessToken } from '../../config/jwt.js';
import { sendEmail } from '../../helpers/sendEmail.js';
// import { emailLimiter, loginLimiter, recoverLimiter, registerLimiter, resetLimiter } from '../../middleware/rateLimit.js';

const router = express.Router();

router.post('/login', async (req, res) => {

    const { email } = req.body;
    const { password } = req.body;
    const result = await login(email, password);

    if (result.error) return res.status(401).json({ message: result.error });

    // 429, 500

    const user = {
        username: 'dersey',
        code: 'AA000001',
        role: 1,
        profileImage: '/img/ejemplo.png',
        totalPosts: 0,
        totalTopics: 0,
        following: 0,
        followers: 0
    };

    const newRefreshToken = generateRefreshToken(user);
    const newAccessToken = generateAccessToken(user);

    //Save refreshToken in DB

    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    });

    res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 *1000
    });

    return res.status(200).json({ message: result.message });
});

router.post('/register', async (req, res) => {

    const { email } = req.body || null;
    const { password } = req.body || null;
    const { repeatedPassword } = req.body || null;
    const { username } = req.body || null;
    const result = await registerUser(username, email, password, repeatedPassword);

    if (result.errors) return res.status(400).json({ 
        errors: result.errors,
        message: 'Errores de validación'
    });

    //409, 429, 500

    const user = {
        email,
        idUser: 1,
        role: 1
    }

    const token = generateVerifyEmailToken(user);

    const verifyLink = `http://localhost:3000/auth/verify?token=${token}`;

    await sendEmail(email, 'Verifica tu correo', `
        <p>Has clic en el enlace para activar tu cuenta:</p>
        <a href="${ verifyLink }">${ verifyLink }</a>
    `);

    return res.status(201).json({ message: result.message });
});

router.post('/recover', async (req, res) => {

    const { email } = req.body || null;
    const result = await recoverAccount(email);

    if (result.errors) return res.status(400).json({ 
        errors: result.errors,
        message: 'Errores de validación'
    });

    //429, 500

    const user = { id: 1 };

    const token = generateResetToken(user);

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    await sendEmail(email, 'Restablece tu contraseña', `
        <p>Has clic en el enlace para restablecer tu contrsaeña:</p>
        <a href="${ resetLink }">${ resetLink }</a>
    `);

    return res.status(200).json({ message: result.message });
});

router.post('/refresh', async (req, res) => {

    const { token } = req.body;

    if (!token) return res.status(401).json({ message: 'Refresh token requerido' });

    //verify refresh in BD

    const user = verifyAccessToken(token);

    if (!user) return res.status(403).json({ message: 'Refresh token expirado o inválido' });

    const newAccessToken = generateAccessToken(user);

    return res.json({ accessToken: newAccessToken });
});

router.patch('/reset', async (req, res) => {

    const { password } = req.body || null;
    const { user } = req || null;
    const result = await resetPassword(password, user?.id);

    if (result.errors) return res.status(400).json({ 
        errors: result.errors,
        message: 'Errores de validación'
    });

    //401, 403, 404, 429, 500

    return res.status(200).json({ message: result.message });
});

router.patch('verify', async (req, res) => {

    const { token } = req.query;

    if (!token) return res.status(401).json({ message: 'Token de verificación requerido' });

    const user = verifyAccessToken(token);

    if (!user) return res.status(403).json({ message: 'Token de expiración expirado o inválido' });

    //active account an get user from BD

    const userBD = {
        email,
        idUser: 1,
        role: 1
    }

    const newRefreshToken = generateRefreshToken(userBD);
    const newAccessToken = generateAccessToken(userBD);

    //Save refreshToken in DB

    return res.status(200).json({ 
        message: result.message, 
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    });
});

export default router;