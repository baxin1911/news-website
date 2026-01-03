import { getAllArticles } from '../../services/articleService.js';
import { getCategory } from '../../helpers/category.js';
import { formatShortDate } from '../../helpers/formattedDate.js';
import { getProfileByIdUser } from '../../services/profileService.js';

export const homeController = async (req, res) => {

    const { user } = req;
    const profile = await getProfileByIdUser(user.id);
    const articles = await getAllArticles();

    res.render('index', { 
        articles, 
        profile,
        currentRoute: '/',
        getCategory, 
        formatShortDate
    });
}