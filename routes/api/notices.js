import express from 'express';
import { getAllNotices } from '../../controllers/noticesController.js';

const router = express.Router();

router.get('/', async (req, res) => {
    
    const notices = await getAllNotices();
    
    res.status(200).json(notices);
});

export default router;