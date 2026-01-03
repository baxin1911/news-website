import { getAuthorsByIdUser } from "../../services/authorService.js";
import { getUsersByIdUser } from "../../services/userService.js";
import { getTagsByIdUser } from "../../services/tagService.js";
import { getCommentsByIdUser } from "../../services/commentService.js";
import { getProfileByIdUser, getProfilePreferencesByIdUser } from "../../services/profileService.js";


export const profileController = async (req, res) => {

    // Get user form BD

    const { user } = req;
    const profile = await getProfileByIdUser(user.id);

    if (!profile) return res.redirect('/?profileError=notFound');

    const authors = await getAuthorsByIdUser(user.id);
    const users = await getUsersByIdUser(user.id);
    const tags = await getTagsByIdUser(user.id);
    const comments = await getCommentsByIdUser(user.id);
    const preferences = await getProfilePreferencesByIdUser(user.id);

    res.render('profile', { 
        profile, 
        comments,
        users,
        authors, 
        tags,
        preferences,
        currentRoute: '/profile'
    });
}