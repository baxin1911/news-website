import { getCategory, getCategoryId } from '../../utils/categoryUtils.js';
import { formatShortDate } from '../../utils/formattedDateUtils.js';
import { buildPagination } from '../../utils/paginationUtils.js';
import { findArticlesByCategory, getArticlesByQuery } from "../../services/articleService.js";
import { getAllCategories } from "../../services/categoryService.js";
import { getProfileByIdUser } from '../../services/profileService.js';

export const searchFeed = async (req, res) => {

    const { currentPage = 1, itemsPerPage = 10, q } = req.query;
    const { user } = req;
    const profile = await getProfileByIdUser(user.id); 
    const articles = await getArticlesByQuery(q);
    const categories = await getAllCategories();
    const pagination = buildPagination(articles.length, currentPage, itemsPerPage);

    return res.render('feed', { 
        q,
        profile,
        articles, 
        categories,
        currentRoute: '/search',
        pagination,
        getCategory, 
        formatShortDate
    });
}

export const showCategoryFeed = async (req, res) => {

    const { slug } = req.params;
    const { currentPage = 1 } = req.query;
    const { user } = req;
    const itemsPerPage = 10;
    const profile = await getProfileByIdUser(user.id);    
    const articles = await findArticlesByCategory(getCategoryId(slug));
    const categories = await getAllCategories();
    const pagination = buildPagination(articles.length, currentPage, itemsPerPage);

    return res.render('feed', { 
        profile,
        articles, 
        categories,
        currentRoute: '/categories/' + slug,
        pagination,
        getCategory, 
        formatShortDate
    });
}