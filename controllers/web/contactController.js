import { getAllCategories } from "../../services/categoryService.js";
import { getProfileByIdUser } from "../../services/userService.js";
import { findTopTagNames } from "../../services/tagService.js";
import { formatShortDate } from "../../utils/formattersUtils.js";

export const showContactForm = async (req, res) => {

    const { user } = req;
    let profile = null;

    if (user) profile = await getProfileByIdUser(user.id);

    const categories = getAllCategories();
    const tags = findTopTagNames();

    return res.render('pages/info/contactPage', {
        profile,
        game: null,
        tags,
        categories,
        currentRoute: '/contact',
        formatShortDate
    });
}