import { findAuthorsByIdUser } from "../../services/authorService.js";
import { findUsersByIdUser } from "../../services/userService.js";
import { findTopTagNames } from "../../services/tagService.js";
import { findCommentsByIdUser } from "../../services/commentService.js";
import { getProfileByIdUser, getProfilePreferencesByIdUser } from "../../services/profileService.js";
import { redirectWithFlash } from "../../utils/flashUtils.js";
import { errorMessages } from "../../messages/messages.js";
import { errorCodeMessages } from "../../messages/codeMessages.js";
import { buildPagination } from "../../utils/paginationUtils.js";
import { formatLongDate, slugify } from "../../utils/formattersUtils.js";


export const getProfile = async (req, res) => {

    // Get user form BD

    const { user } = req;
    const { currentPage = 1} = req.query;
    const itemsPerPage = 10;
    const profile = await getProfileByIdUser(user.id);

    if (!profile)  return redirectWithFlash(res, errorMessages.INVALID_AUTH, errorCodeMessages.INVALID_AUTH, 'error');

    const authors = await findAuthorsByIdUser(user.id);
    const tags = await findTopTagNames();
    const users = await findUsersByIdUser(user.id);
    const comments = await findCommentsByIdUser(user.id);
    const preferences = await getProfilePreferencesByIdUser(user.id);
    const pagination = buildPagination(comments.length, currentPage, itemsPerPage);

    return res.render('profile', { 
        profile, 
        comments,
        tags,
        users,
        authors, 
        preferences,
        queryParams: {},
        currentRoute: '/profile',
        pagination,
        slugify,
        formatLongDate
    });
}