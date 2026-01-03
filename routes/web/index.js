import express from 'express';
import { homeController } from '../../controllers/web/indexController.js';
import { verifyCookiesAuthTokenOptional } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', verifyCookiesAuthTokenOptional, homeController);
export default router;