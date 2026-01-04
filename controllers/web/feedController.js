import { getCategory, getCategoryId } from '../../utils/categoryUtils.js';
import { formatShortDate } from '../../utils/formattedDateUtils.js';
import { buildPagination } from '../../utils/paginationUtils.js';
import { getArticlesByCategoryService, searchArticlesService } from "../../services/articleService.js";
import { getAllCategoriesService } from "../../services/categoryService.js";
import { getProfileByIdUserService } from '../../services/profileService.js';

export const searchFeedController = async (req, res) => {

    const { currentPage = 1, itemsPerPage = 10, q } = req.query;
    const { user } = req;
    const profile = await getProfileByIdUserService(user.id); 
    const articles = await searchArticlesService(q);
    const categories = await getAllCategoriesService();
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

export const categoryFeedController = async (req, res) => {

    const { slug } = req.params;
    const { currentPage = 1 } = req.query;
    const { user } = req;
    const itemsPerPage = 10;
    const profile = await getProfileByIdUserService(user.id);    
    const articles = await getArticlesByCategoryService(getCategoryId(slug));
    const categories = await getAllCategoriesService();
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