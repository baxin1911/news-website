import express from 'express';
import { searchNews } from '../../controllers/searchController.js';

const router = express.Router();

router.get('/', async (req, res) => {

    const { query } = req || null;
    const result = await searchNews(query);

    if (result.errors) return res.status(400).json({ 
        errors: result.errors,
        message: 'Errores de validación'
    });

    //401, 403, 429, 500

    const { page = 1, limit = 10, category } = query;
    const { notices } = result;

    const filteredNotices = notices.filter(notice => notice.category === Number(category));

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedNotices = filteredNotices.slice(start, end);

    return res.status(200).json({ 
        message: (filteredNotices.length > 0) ? 'Búsqueda exitosa' : 'No se encontraron resultados',
        data: paginatedNotices,
        total: filteredNotices.length,
        page: Number(page),
        limit: Number(limit)
    });
});

export default router;