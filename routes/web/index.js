import express from 'express';
import { getAllNotices } from '../../controllers/noticesController.js';
import { getCategory } from '../../helpers/category.js';
import { formatShortDate } from '../../helpers/formattedDate.js';
import { getAllCategories } from '../../controllers/categoryController.js';

const router = express.Router();

router.get('/', async (req, res) => {

    const notices = await getAllNotices();

    res.render('index', { 
        notices, 
        pageViewMode: 'home',
        getCategory, 
        formatShortDate
    });
});

router.get('/reset-password', async (req, res) => {

    const { token } = req.query || null;

    res.render('reset', {
        token
    });
});

router.get('/search', async (req, res) => {

    const notices = await getAllNotices();
    const categories = await getAllCategories();

    res.render('search', { 
        notices, 
        categories,
        pageViewMode: 'search',
        getCategory, 
        formatShortDate
    });
});

export default router;