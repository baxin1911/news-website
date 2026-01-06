import { getAuthorsByIdUserService } from "../../services/authorService.js";
import { getUsersByIdUserService } from "../../services/userService.js";
import { getTagsByIdUserService } from "../../services/tagService.js";
import { getCommentsByIdUserService } from "../../services/commentService.js";
import { getProfileByIdUserService, getProfilePreferencesByIdUserService } from "../../services/profileService.js";
import { redirectWithFlash } from "../../utils/flashUtils.js";
import { errorMessages } from "../../messages/messages.js";
import { errorCodeMessages } from "../../messages/codeMessages.js";


export const profileController = async (req, res) => {

    // Get user form BD

    const { user } = req;
    const profile = await getProfileByIdUserService(user.id);

    if (!profile)  return redirectWithFlash(res, errorMessages.AUTH_INVALID, errorCodeMessages.AUTH_INVALID, 'error');

    const authors = await getAuthorsByIdUserService(user.id);
    const users = await getUsersByIdUserService(user.id);
    const tags = await getTagsByIdUserService(user.id);
    const comments = await getCommentsByIdUserService(user.id);
    const preferences = await getProfilePreferencesByIdUserService(user.id);

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