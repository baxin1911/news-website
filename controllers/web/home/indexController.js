import { getAllArticlesService } from '../../../services/articleService.js';
import { getCategory } from '../../../utils/categoryUtils.js';
import { formatShortDate } from '../../../utils/formattedDateUtils.js';
import { getProfileByIdUserService } from '../../../services/profileService.js';

export const homeController = async (req, res) => {

    const { user } = req;
    let profile = null;

    if (user) profile = await getProfileByIdUserService(user.id);

    const articles = await getAllArticlesService();

    return res.render('index', { 
        articles, 
        profile,
        currentRoute: '/',
        getCategory, 
        formatShortDate
    });
}