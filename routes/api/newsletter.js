import express from 'express';
import { subscribeController } from '../../controllers/api/newsletterController.js';

const router = express.Router();

router.post('/subscribe', (req, res, next) => {

    const { email } = req.body || {};
    const errors = { emailError: validateEmail(email) };
    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return res.status(400).json({ errors, message: 'Errores de validación' });

    next();

}, subscribeController);

export default router;