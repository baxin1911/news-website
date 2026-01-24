import express from 'express';
import { getHome } from '../../controllers/web/homeController.js';
import { verifyAuthTokenOptional } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get(
    '/', 
    verifyAuthTokenOptional({ source: 'cookies' }), 
    getHome
);

export default router;