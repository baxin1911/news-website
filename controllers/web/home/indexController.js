import { getAllArticles } from '../../../services/articleService.js';
import { getCategory } from '../../../utils/categoryUtils.js';
import { formatShortDate, slugify } from '../../../utils/formattersUtils.js';
import { getProfileByIdUser } from '../../../services/profileService.js';
import { findTopTagNames } from '../../../services/tagService.js';

export const getHome = async (req, res) => {

    const { user } = req;
    let profile = null;

    if (user) profile = await getProfileByIdUser(user.id);

    const articles = await getAllArticles();
    const tags = await findTopTagNames();

    return res.render('index', { 
        articles,
        tags, 
        profile,
        currentRoute: '/',
        slugify,
        getCategory, 
        formatShortDate
    });
}