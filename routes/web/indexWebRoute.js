import express from 'express';
import { getHome } from '../../controllers/web/home/indexController.js';
import { verifyCookiesAuthTokenOptional } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get(
    '/', 
    verifyCookiesAuthTokenOptional, 
    getHome
);

export default router;