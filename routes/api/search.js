import express from 'express';
import { searchNotices } from '../../controllers/searchController.js';
import { buildPagination } from '../../helpers/pagination.js';

const router = express.Router();

router.get('/', async (req, res) => {

    const { q } = req.query || null;
    const result = await searchNotices(q);

    if (result.errors) return res.status(400).json({ 
        errors: result.errors,
        message: 'Errores de validación'
    });

    //401, 403, 429, 500

    const { page = 1, limit = 20, category } = query;
    const { notices } = result;

    let filteredNotices = notices.filter(notice => notice.category === Number(category));

    if (!category) filteredNotices = notices;

    const pagination = buildPagination(filteredNotices.length, page, limit);

    return res.status(200).json({ 
        message: (filteredNotices.length > 0) ? 'Búsqueda exitosa' : 'No se encontraron resultados',
        notices: paginatedNotices,
        pagination
    });
});

export default router;