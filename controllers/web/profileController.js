import { getCategory } from "../../helpers/category.js";
import { formatShortDate } from "../../helpers/formattedDate.js";
import { getAllArticles } from "../../services/articlesService.js";

export const profileController = async (req, res) => {

    // Get user form BD

    const { user } = req;

    const articles = await getAllArticles();

    res.render('profile', { 
        user, 
        articles, 
        getCategory, 
        currentRoute: '/profile',
        formatShortDate
    });
}