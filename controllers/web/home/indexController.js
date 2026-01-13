import { getAllArticles } from '../../../services/articleService.js';
import { getCategory } from '../../../utils/categoryUtils.js';
import { formatShortDate } from '../../../utils/formattedDateUtils.js';
import { getProfileByIdUser } from '../../../services/profileService.js';

export const getHome = async (req, res) => {

    const { user } = req;
    let profile = null;

    if (user) profile = await getProfileByIdUser(user.id);

    const articles = await getAllArticles();

    return res.render('index', { 
        articles, 
        profile,
        currentRoute: '/',
        getCategory, 
        formatShortDate
    });
}