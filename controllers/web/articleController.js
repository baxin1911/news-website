import { validateWebPagination } from "../../middleware/validatorMiddleware.js";
import { getArticleByTitle } from "../../services/articleService.js";
import { countCommentsByArticleId } from "../../services/commentService.js";
import { getCategory } from "../../utils/categoryUtils.js";
import { formatLongDate, formatShortDate, formatRelativeDate, slugify, unslugify } from "../../utils/formattersUtils.js";

import { getArticlePage } from "../../services/pageService.js";

export const showArticle = async (req, res) => {

    const { user, pageSettings } = req;
    const { slug } = req.params;
    const data = await getArticlePage({ user, slug, pageSettings });

    return res.render('pages/article/articlePage', {
        ...data,
        queryParams: {},
        currentRoute: slug,
        slugify,
        getCategory, 
        formatShortDate,
        formatRelativeDate,
        formatLongDate
    });
}

const getTotalCommentsForArticle = async (req) => {
    
    const text = unslugify(req.params.slug);
    const article = await getArticleByTitle(text);
    const count = await countCommentsByArticleId(article.id);
    
    return count;
}

export const showArticleWithPagination = [
    validateWebPagination(getTotalCommentsForArticle, 5),
    showArticle
];