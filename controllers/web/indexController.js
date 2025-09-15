import { getAllArticles } from '../../services/articlesService.js';
import { getCategory } from '../../helpers/category.js';
import { formatShortDate } from '../../helpers/formattedDate.js';

export const homeController = async (req, res) => {

    const { user } = req;
    const notices = await getAllArticles();

    res.render('index', { 
        notices, 
        user,
        currentRoute: '/',
        getCategory, 
        formatShortDate
    });
}