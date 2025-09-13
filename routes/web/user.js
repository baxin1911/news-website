import express from 'express';
import { verifyToken } from '../../middleware/web/auth.js';
import { getAllNotices } from '../../controllers/noticesController.js';
import { getCategory } from '../../helpers/category.js';
import { formatShortDate } from '../../helpers/formattedDate.js';

const router = express.Router();

router.get('/profile', verifyToken, async (req, res) => {

    // Get user form BD

    const { user } = req;

    const notices = await getAllNotices();

    res.render('profile', { 
        user, 
        notices, 
        getCategory, 
        currentRoute: '/profile',
        formatShortDate
    });
});

export default router;