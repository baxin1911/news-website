import { buildPagination } from "../../utils/paginationUtils.js";
import { searchArticlesService } from "../../services/articleService.js";

export const searchArticleController = async (req, res) => {

    const { q } = req.query || {};
    const result = await searchArticlesService(q);

    if (result.error) return res.status(500).json({ message: result.error });

    //401, 403, 429, 500

    const { page = 1, limit = 20, category } = query;
    const { articles } = result;

    let filteredArticles = articles.filter(article => article.category === Number(category));

    if (!category) filteredArticles = articles;

    const pagination = buildPagination(filteredArticles.length, page, limit);

    return res.status(200).json({ 
        message: (filteredArticles.length > 0) ? 'Búsqueda exitosa' : 'No se encontraron resultados',
        articles: filteredArticles,
        pagination
    });
}