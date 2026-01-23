import { validatePagination } from "../../middleware/validatorMiddleware.js";
import { getAllArticles, getArticleByTitle } from "../../services/articleService.js";
import { getAllCategories } from "../../services/categoryService.js";
import { countCommentsByArticleId, findCommentsByArticleId } from "../../services/commentService.js";
import { getProfileByIdUser } from "../../services/profileService.js";
import { findTopTagNames } from "../../services/tagService.js";
import { getCategory } from "../../utils/categoryUtils.js";
import { formatLongDate, formatShortDate, formatRelativeDate, slugify, unslugify } from "../../utils/formattersUtils.js";

export const showArticle = async (req, res) => {

    const { user } = req;
    let profile = null;

    if (user) profile = await getProfileByIdUser(user.id);

    const { slug } = req.params;
    const text = unslugify(slug);
    const { offset, pagination, itemsPerPage } = req.pageSettings;
    const article = await getArticleByTitle(text);
    const comments = await findCommentsByArticleId(article.id, itemsPerPage, offset);
    const tags = await findTopTagNames();
    const articles = await getAllArticles();
    const categories = await getAllCategories();

    return res.render('article', {
        article,
        profile,
        tags,
        articles, 
        categories,
        comments,
        queryParams: {},
        currentRoute: slug,
        pagination,
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
    validatePagination(getTotalCommentsForArticle, 5),
    showArticle
];