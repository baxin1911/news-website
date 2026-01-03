import { getAllArticlesService } from '../../../services/articleService.js';
import { getCategory } from '../../../utils/categoryUtils.js';
import { formatShortDate } from '../../../utils/formattedDateUtils.js';
import { getProfileByIdUserService } from '../../../services/profileService.js';

export const homeController = async (req, res) => {

    const { user } = req;
    const profile = await getProfileByIdUserService(user.id);
    const articles = await getAllArticlesService();

    res.render('index', { 
        articles, 
        profile,
        currentRoute: '/',
        getCategory, 
        formatShortDate
    });
}