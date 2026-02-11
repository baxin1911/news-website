import { findArticlesByQuery } from "../../services/articleService.js";
import { infoCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";

export const searchArticle = async (req, res) => {

    const { q } = req.query || {};
    const { offset, pagination, itemsPerPage } = req.pageSettings;
    const result = await findArticlesByQuery(q, itemsPerPage, offset);

    return res.status(200).json({ 
        message: (result.length > 0) ? successCodeMessages.SUCCESS_SEARCH : infoCodeMessages.NO_CONTENT_SEARCH,
        articles: result,
        pagination
    });
}