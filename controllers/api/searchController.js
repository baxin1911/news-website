import { countArticlesByQuery, findArticlesByQuery } from "../../services/articleService.js";
import { infoCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";
import { validateWebPagination } from "../../middleware/validatorMiddleware.js";

const searchArticle = async (req, res) => {

    const { q } = req.query || {};
    const { offset, pagination, itemsPerPage } = req.pageSettings;
    const articles = await findArticlesByQuery(q, itemsPerPage, offset);

    return res.status(200).json({ 
        code: (articles.length > 0) ? successCodeMessages.SUCCESS_SEARCH : infoCodeMessages.NO_CONTENT_SEARCH,
        articles,
        pagination,
        q
    });
}

const getTotalArticlesForSearch = async (req) => await countArticlesByQuery(req.query.q);

export const searchFeedWithPagination = [
    validateWebPagination(getTotalArticlesForSearch, 10),
    searchArticle
];