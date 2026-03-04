import { getCategory } from '../../utils/categoryUtils.js';
import { formatShortDate, slugify } from '../../utils/formattersUtils.js';
import { getHomePage } from '../../services/pageService.js';

export const getHome = async (req, res) => {

    const { user } = req;
    const data = await getHomePage({ user });

    return res.render('pages/home/homePage', { 
        ...data,
        currentRoute: '/',
        slugify,
        getCategory, 
        formatShortDate
    });
}