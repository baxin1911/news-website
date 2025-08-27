import express from 'express';
import { subscribe } from '../../controllers/newsletterController.js';

const router = express.Router();

router.post('/subscribe', async (req, res) => {

    const { email } = req.body || null;
    const result = await subscribe(email);

    if (result.errors) return res.status(400).json({ 
        errors: result.errors,
        message: 'Errores de validación'
    });

    //403, 429, 500

    return res.status(202).json({ message: result.message });
});

export default router;