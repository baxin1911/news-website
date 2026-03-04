import { formatShortDate } from "../../utils/formattersUtils.js";
import { getContactPage } from "../../services/pageService.js";

export const showContactForm = async (req, res) => {

    const { user } = req;
    
    const data = await getContactPage({ user });

    return res.render('pages/info/contactPage', {
        ...data,
        currentRoute: '/contact',
        formatShortDate
    });
}