import express from 'express';
import { getAllNotices, getNoticesByCategory } from '../../controllers/noticesController.js';
import { searchNotices } from '../../controllers/searchController.js';
import { getCategory, getCategoryId } from '../../helpers/category.js';
import { formatShortDate } from '../../helpers/formattedDate.js';
import { getAllCategories } from '../../controllers/categoryController.js';
import { buildPagination } from '../../helpers/pagination.js';

const router = express.Router();

router.get('/', async (req, res) => {

    const notices = await getAllNotices();

    res.render('index', { 
        notices, 
        user: null,
        currentRoute: '/',
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

    const { currentPage = 1, itemsPerPage = 10, q } = req.query;

    const { notices, errors } = await searchNotices(q);
    const categories = await getAllCategories();
    const pagination = buildPagination(notices.length, currentPage, itemsPerPage);

    res.render('feed', { 
        user: null,
        notices, 
        categories,
        currentRoute: '/search',
        pagination,
        getCategory, 
        formatShortDate
    });
});

router.get('/categories/:slug', async (req, res) => {
    const { slug } = req.params;
    const currentPage = 1, itemsPerPage = 10;

    const notices = await getNoticesByCategory(getCategoryId(slug));
    const categories = await getAllCategories();
    const pagination = buildPagination(notices.length, currentPage, itemsPerPage);

    res.render('feed', { 
        user: null,
        notices, 
        categories,
        currentRoute: '/categories/' + slug,
        pagination,
        getCategory, 
        formatShortDate
    });
});

export default router;