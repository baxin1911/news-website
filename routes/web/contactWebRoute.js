import express from 'express';
import { verifyAuthTokenOptional } from '../../middleware/authMiddleware.js';
import { showContactForm } from '../../controllers/web/contactController.js';

const router = express.Router();

router.get(
    '/contact',
    verifyAuthTokenOptional({ source: 'cookies' }),
    showContactForm
)

export default router;