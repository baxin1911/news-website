import { existsArticleByTitle, getAllArticles, getArticleByTitle } from "../../services/articleService.js";
import { getAllCategories } from "../../services/categoryService.js";
import { getProfileByIdUser } from "../../services/profileService.js";
import { findTopTagNames } from "../../services/tagService.js";
import { getCategory } from "../../utils/categoryUtils.js";
import { formatLongDate, formatShortDate, slugify, unslugify } from "../../utils/formattersUtils.js";
import { buildPagination } from "../../utils/paginationUtils.js";

export const showArticle = async (req, res) => {

    const { slug } = req.params;
    const { currentPage = 1 } = req.query;
    const { user } = req;
    const itemsPerPage = 10;
    const text = unslugify(slug);
    const existsArticle = await existsArticleByTitle(text);

    if (!existsArticle) return res.status(404).render('error/404');

    let profile = null;

    if (user) profile = await getProfileByIdUser(user.id);

    const article = getArticleByTitle(text);
    const tags = await findTopTagNames();
    const articles = await getAllArticles();
    const categories = await getAllCategories();
    const pagination = buildPagination(articles.length, currentPage, itemsPerPage);

    return res.render('article', {
        article,
        profile,
        tags,
        articles, 
        categories,
        queryParams: {},
        currentRoute: slug,
        pagination,
        slugify,
        getCategory, 
        formatShortDate,
        formatLongDate
    });
}