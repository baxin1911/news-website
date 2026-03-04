import { getCategory, getCategoryId } from '../../utils/categoryUtils.js';
import { formatShortDate, slugify, unslugify } from '../../utils/formattersUtils.js';
import { countArticlesByCategory, countArticlesByQuery, countArticlesByTag } from "../../services/articleService.js";
import { validateWebPagination } from '../../middleware/validatorMiddleware.js';
import { getSearchFeedPage, getTagFeedPage } from '../../services/pageService.js';

export const searchFeed = async (req, res) => {

    const { user, pageSettings } = req;
    const { q } = req.query;
    
    const data = await getSearchFeedPage({ user, q, pageSettings });

    const pageTitle = `Buscar: ${ q }`;

    return res.render('pages/feed/feedPage', { 
        ...data,
        pageTitle,
        title: q,
        currentRoute: '/search',
        queryParams: { q },
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

    const { user, pageSettings } = req;

    const data = await getSearchFeedPage({ user, q: category, pageSettings });

    const categoryName = getCategory(category);
    const pageTitle = `Categoría: ${ categoryName }`;

    return res.render('pages/feed/feedPage', { 
        ...data,
        pageTitle,
        title: categoryName,
        queryParams: {},
        currentRoute: '/categories/' + slug,
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
    const { user, pageSettings } = req;
    const tag = unslugify(slug);

    const data = await getTagFeedPage({ user, tag, pageSettings });

    const pageTitle = `Etiqueta: ${ tag }`;

    return res.render('pages/feed/feedPage', {
        ...data,
        pageTitle,
        title: tag,
        queryParams: {},
        currentRoute: slug,
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