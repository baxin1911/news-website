import express from 'express';
import { checkToken } from '../../middleware/errorHandler.js';
import { getAllNotices } from '../../controllers/noticesController.js';
import { getCategory } from '../../helpers/category.js';
import { formatShortDate } from '../../helpers/formattedDate.js';

const router = express.Router();

router.get('/profile', checkToken, async (req, res) => {

    // Get user form BD

    const user = {
        username: 'dersey',
        code: 'AA000001',
        profileImage: null,
        totalPosts: 0,
        totalTopics: 0,
        following: 0,
        followers: 0
    };

    const notices = await getAllNotices();

    res.render('profile', { 
        user, 
        notices, 
        getCategory, 
        currentRoute: '/profile',
        formatShortDate
    });
});

router.post('/logout', checkToken, async (req, res) => {

    // Delete refreshToken from DB

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.redirect("/");
});

export default router;