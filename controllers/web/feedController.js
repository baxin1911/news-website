import { getCategory, getCategoryId } from '../../utils/categoryUtils.js';
import { formatShortDate, slugify, unslugify } from '../../utils/formattersUtils.js';
import { buildPagination } from '../../utils/paginationUtils.js';
import { findArticlesByCategory, findArticlesByQuery, findArticlesByTag } from "../../services/articleService.js";
import { getAllCategories } from "../../services/categoryService.js";
import { getProfileByIdUser } from '../../services/profileService.js';
import { existsTagByName, findTopTagNames } from '../../services/tagService.js';
import { existsGameByName, getGameByName } from '../../services/gameService.js';

export const searchFeed = async (req, res) => {

    const { currentPage = 1, itemsPerPage = 10, q } = req.query;
    const { user } = req;
    let profile = null;

    if (user) profile = await getProfileByIdUser(user.id);

    const articles = await findArticlesByQuery(q);
    const categories = await getAllCategories();
    const pagination = buildPagination(articles.length, currentPage, itemsPerPage);

    return res.render('feed', { 
        title: q,
        profile,
        game: null,
        articles, 
        categories,
        currentRoute: '/search',
        queryParams: { q },
        pagination,
        slugify,
        getCategory, 
        formatShortDate
    });
}

export const showCategoryFeed = async (req, res) => {

    const { slug } = req.params;
    const { currentPage = 1 } = req.query;
    const { user } = req;
    const itemsPerPage = 10;
    const category = getCategoryId(slug);

    if (category === 'none') return res.status(404).render('error/404');

    let profile = null;

    if (user) profile = await getProfileByIdUser(user.id);

    const articles = await findArticlesByCategory(category);
    const categories = await getAllCategories();
    const tags = await findTopTagNames();
    const pagination = buildPagination(articles.length, currentPage, itemsPerPage);

    return res.render('feed', { 
        title: getCategory(category),
        profile,
        game: null,
        tags,
        articles, 
        categories,
        queryParams: {},
        currentRoute: '/categories/' + slug,
        pagination,
        slugify,
        getCategory, 
        formatShortDate
    });
}

export const showTagFeed = async (req, res) => {

    const { slug } = req.params;
    const { currentPage = 1 } = req.query;
    const { user } = req;
    const itemsPerPage = 10;
    const tag = unslugify(slug);

    const existsTag = await existsTagByName(tag);

    if (!existsTag) return res.status(404).render('error/404');

    let existsGame = await existsGameByName(tag);
    let game = null;

    if (existsGame) game = await getGameByName(tag);
 
    let profile = null;

    if (user) profile = await getProfileByIdUser(user.id);

    const articles = await findArticlesByTag(slug);
    const tags = await findTopTagNames();
    const categories = await getAllCategories();
    const pagination = buildPagination(articles.length, currentPage, itemsPerPage);

    return res.render('feed', {
        title: tag,
        profile,
        game,
        articles,
        tags,
        categories,
        queryParams: {},
        currentRoute: slug,
        pagination,
        slugify,
        getCategory, 
        formatShortDate
    });
}