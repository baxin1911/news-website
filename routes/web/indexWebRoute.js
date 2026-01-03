import express from 'express';
import { homeController } from '../../controllers/web/home/indexController.js';
import { verifyCookiesAuthTokenOptional } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyCookiesAuthTokenOptional, homeController);

export default router;