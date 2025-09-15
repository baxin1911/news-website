import { buildPagination } from "../../helpers/pagination.js";
import { searchArticles } from "../../services/articlesService.js";

export const searchArticleController = async (req, res) => {

    const { q } = req.query || {};
    const result = await searchArticles(q);

    if (result.error) return res.status(500).json({ message: result.error });

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
}