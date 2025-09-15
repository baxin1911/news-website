import express from 'express';
import { getAllArticles } from '../../services/articlesService.js';
import { getCategory } from '../../helpers/category.js';
import { formatShortDate } from '../../helpers/formattedDate.js';
import { verifyWebAuthTokenRequired } from '../../middleware/auth.js';

const router = express.Router();

router.get('/profile', verifyWebAuthTokenRequired, async (req, res) => {

    // Get user form BD

    const { user } = req;

    const notices = await getAllArticles();

    res.render('profile', { 
        user, 
        notices, 
        getCategory, 
        currentRoute: '/profile',
        formatShortDate
    });
});

export default router;