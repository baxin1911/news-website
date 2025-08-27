import express from 'express';
import { login, recoverAccount, registerUser, resetPassword } from '../../controllers/authController.js';

const router = express.Router();

router.post('/login', async (req, res) => {

    const { email } = req.body;
    const { password } = req.body;
    const result = await login(email, password);

    if (result.error) return res.status(401).json({ message: result.error });

    // 429, 500

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

    return res.status(200).json({ message: result.message });
});

router.patch('/reset', async (req, res) => {

    const { token } = req.body || null;

    if (!token || token !== '') {

        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }

    const { password } = req.body || null;
    const result = await resetPassword(password);

    if (result.errors) return res.status(400).json({ 
        errors: result.errors,
        message: 'Errores de validación'
    });

    //401, 403, 404, 429, 500

    return res.status(200).json({ message: result.message });
});

export default router;