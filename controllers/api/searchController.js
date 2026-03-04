import { countArticlesByQuery, findArticlesByQuery } from "../../services/articleService.js";
import { infoCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";
import { validateWebPagination } from "../../middleware/validatorMiddleware.js";
import { createSearchDtoForSearchSettings } from "../../dtos/searchDTO.js";

const searchArticle = async (req, res) => {

    const { q } = req.query || {};
    const { offset, pagination } = req.pageSettings;
    const searchDto = createSearchDtoForSearchSettings(q, offset);
    
    const articles = await findArticlesByQuery(searchDto);

    return res.status(200).json({ 
        code: (articles.length > 0) ? successCodeMessages.SUCCESS_SEARCH : infoCodeMessages.NO_CONTENT_SEARCH,
        result: {
            articles,
            pagination,
            q
        }
    });
}

const getTotalArticlesForSearch = async (req) => await countArticlesByQuery(req.query.q);

export const searchFeedWithPagination = [
    validateWebPagination(getTotalArticlesForSearch, 10),
    searchArticle
];