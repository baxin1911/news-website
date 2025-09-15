import express from 'express';
import { homeController } from '../../controllers/web/indexController.js';
import { verifyWebAuthTokenOptional } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', verifyWebAuthTokenOptional, homeController);

export default router;