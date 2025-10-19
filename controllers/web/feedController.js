import { getCategory, getCategoryId } from '../../helpers/category.js';
import { formatShortDate } from '../../helpers/formattedDate.js';
import { buildPagination } from '../../helpers/pagination.js';
import { getArticlesByCategory, searchArticles } from "../../services/articleService.js";
import { getAllCategories } from "../../services/categoryService.js";

export const searchFeedController = async (req, res) => {

    const { currentPage = 1, itemsPerPage = 10, q } = req.query;
    const { user } = req;

    const articles = await searchArticles(q);
    const categories = await getAllCategories();
    const pagination = buildPagination(articles.length, currentPage, itemsPerPage);

    res.render('feed', { 
        q,
        user,
        articles, 
        categories,
        currentRoute: '/search',
        pagination,
        getCategory, 
        formatShortDate
    });
}

export const categoryFeedController = async (req, res) => {

    const { slug } = req.params;
    const { currentPage = 1 } = req.query;
    const { user } = req;
    const itemsPerPage = 10;

    const articles = await getArticlesByCategory(getCategoryId(slug));
    const categories = await getAllCategories();
    const pagination = buildPagination(articles.length, currentPage, itemsPerPage);

    res.render('feed', { 
        user,
        articles, 
        categories,
        currentRoute: '/categories/' + slug,
        pagination,
        getCategory, 
        formatShortDate
    });
}