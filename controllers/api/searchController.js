import { findArticlesByQuery } from "../../services/articleService.js";
import { infoCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";

export const searchArticle = async (req, res) => {

    const { q } = req.query || {};
    const { offset, pagination, itemsPerPage } = req.pageSettings;
    const result = await findArticlesByQuery(q, itemsPerPage, offset);

    if (result.error) return res.status(500).json({ message: result.error });

    //401, 403, 429, 500

    const { articles } = result;

    return res.status(200).json({ 
        message: (articles.length > 0) ? successCodeMessages.SUCCESS_SEARCH : infoCodeMessages.NO_CONTENT_SEARCH,
        articles: articles,
        pagination
    });
}