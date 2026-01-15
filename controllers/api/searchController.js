import { buildPagination } from "../../utils/paginationUtils.js";
import { findArticlesByQuery } from "../../services/articleService.js";
import { infoCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";

export const searchArticle = async (req, res) => {

    const { q } = req.query || {};
    const result = await findArticlesByQuery(q);

    if (result.error) return res.status(500).json({ message: result.error });

    //401, 403, 429, 500

    const { page = 1, limit = 20, category } = query;
    const { articles } = result;

    let filteredArticles = articles.filter(article => article.category === Number(category));

    if (!category) filteredArticles = articles;

    const pagination = buildPagination(filteredArticles.length, page, limit);

    return res.status(200).json({ 
        message: (filteredArticles.length > 0) ? successCodeMessages.SEARCH_SUCCESS : infoCodeMessages.NO_CONTENT_SEARCH,
        articles: filteredArticles,
        pagination
    });
}