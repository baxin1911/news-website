import { getCategory, getCategoryId } from '../../utils/categoryUtils.js';
import { formatShortDate, slugify, unslugify } from '../../utils/formattersUtils.js';
import { countArticlesByCategory, countArticlesByQuery, countArticlesByTag, findArticlesByCategory, findArticlesByQuery, findArticlesByTag } from "../../services/articleService.js";
import { getAllCategories } from "../../services/categoryService.js";
import { getProfileByIdUser } from '../../services/userService.js';
import { findTopTagNames } from '../../services/tagService.js';
import { existsGameByName, getGameByName } from '../../services/gameService.js';
import { validateWebPagination } from '../../middleware/validatorMiddleware.js';
import { createSearchDtoForSearchSettings } from '../../dtos/searchDTO.js';

export const searchFeed = async (req, res) => {

    const { user } = req;
    let profile = null;

    if (user) profile = await getProfileByIdUser(user.id);

    const { offset, pagination } = req.pageSettings;
    const { q } = req.query;
    const searchDto = createSearchDtoForSearchSettings(q, offset);
    const articles = await findArticlesByQuery(searchDto);
    const tags = await findTopTagNames();
    const categories = await getAllCategories();
    const pageTitle = `Buscar: ${ q }`;

    return res.render('pages/feed/feedPage', { 
        pageTitle,
        title: q,
        profile,
        game: null,
        articles, 
        tags,
        categories,
        currentRoute: '/search',
        queryParams: { q },
        pagination,
        slugify,
        getCategory, 
        formatShortDate
    });
}

const getTotalArticlesForSearch = async (req) => await countArticlesByQuery(req.query.q);

export const searchFeedWithPagination = [
    validateWebPagination(getTotalArticlesForSearch, 10),
    searchFeed
];

export const showCategoryFeed = async (req, res) => {

    const { slug } = req.params;
    const category = getCategoryId(slug);

    if (category === 'none') return res.status(404).render('pages/error/404');

    const { user } = req;
    let profile = null;

    if (user) profile = await getProfileByIdUser(user.id);

    const { offset, pagination } = req.pageSettings;
    const searchDto = createSearchDtoForSearchSettings(category, offset);
    const articles = await findArticlesByCategory(searchDto);
    const categories = await getAllCategories();
    const tags = await findTopTagNames();
    const categoryName = getCategory(category);
    const pageTitle = `Categoría: ${ categoryName }`;

    return res.render('pages/feed/feedPage', { 
        pageTitle,
        title: categoryName,
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

const getTotalArticlesForCategory = async (req) => {
    
    const categoryId = getCategoryId(req.params.slug);

    if (categoryId === 'none') return 0;
    
    const count = await countArticlesByCategory(categoryId);

    return count;
};

export const showCategoryFeedWithPagination = [
    validateWebPagination(getTotalArticlesForCategory, 10),
    showCategoryFeed
];

export const showTagFeed = async (req, res) => {

    const { slug } = req.params;
    const tag = unslugify(slug);
    let existsGame = await existsGameByName(tag);
    let game = null;

    if (existsGame) game = await getGameByName(tag);
 
    const { user } = req;
    let profile = null;

    if (user) profile = await getProfileByIdUser(user.id);

    const { offset, pagination } = req.pageSettings;
    const searchDto = createSearchDtoForSearchSettings(tag, offset);
    const articles = await findArticlesByTag(searchDto);
    const tags = await findTopTagNames();
    const categories = await getAllCategories();
    const pageTitle = `Etiqueta: ${ tag }`;

    return res.render('pages/feed/feedPage', {
        pageTitle,
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

const getTotalArticlesForTag = async (req) => {
    
    const tag = unslugify(req.params.slug);
    const count = await countArticlesByTag(tag);

    return count;
}

export const showTagFeedWithPagination = [
    validateWebPagination(getTotalArticlesForTag, 10),
    showTagFeed
];