import express from 'express';
import indexController from '../controllers/indexController.js';

const router = express.Router();

//Main page
router.get('/', indexController);

export default router;