import { findAuthorsByIdUser } from "../../services/authorService.js";
import { getUsersByIdUser } from "../../services/userService.js";
import { getTagsByIdUser } from "../../services/tagService.js";
import { findCommentsByIdUser } from "../../services/commentService.js";
import { getProfileByIdUser, getProfilePreferencesByIdUser } from "../../services/profileService.js";
import { redirectWithFlash } from "../../utils/flashUtils.js";
import { errorMessages } from "../../messages/messages.js";
import { errorCodeMessages } from "../../messages/codeMessages.js";


export const getProfile = async (req, res) => {

    // Get user form BD

    const { user } = req;
    const profile = await getProfileByIdUser(user.id);

    if (!profile)  return redirectWithFlash(res, errorMessages.AUTH_INVALID, errorCodeMessages.AUTH_INVALID, 'error');

    const authors = await findAuthorsByIdUser(user.id);
    const users = await getUsersByIdUser(user.id);
    const tags = await getTagsByIdUser(user.id);
    const comments = await findCommentsByIdUser(user.id);
    const preferences = await getProfilePreferencesByIdUser(user.id);

    return res.render('profile', { 
        profile, 
        comments,
        users,
        authors, 
        tags,
        preferences,
        currentRoute: '/profile'
    });
}