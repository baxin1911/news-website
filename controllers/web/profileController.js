import { findAuthorsByIdUser } from "../../services/authorService.js";
import { findUsersByIdUser, getUsernameByUserId } from "../../services/userService.js";
import { findTopTagNames } from "../../services/tagService.js";
import { countCommentsByUserId, findCommentsByUserId } from "../../services/commentService.js";
import { getProfileByIdUser, getUserPreferencesByIdUser } from "../../services/userService.js";
import { redirectWithFlash } from "../../utils/flashUtils.js";
import { errorMessages } from "../../messages/messages.js";
import { errorCodeMessages } from "../../messages/codeMessages.js";
import { formatLongDate, slugify } from "../../utils/formattersUtils.js";
import { validateWebPagination } from "../../middleware/validatorMiddleware.js";

export const getProfile = async (req, res) => {

    // Get user form BD

    const { id } = req.user;
    const profile = await getProfileByIdUser(id);

    if (!profile)  return redirectWithFlash(
        res, 
        errorMessages.INVALID_AUTH, 
        errorCodeMessages.INVALID_AUTH, 
        'error'
    );

    profile.username = await getUsernameByUserId(id);
    const { offset, pagination, itemsPerPage } = req.pageSettings;
    const comments = await findCommentsByUserId(id, itemsPerPage, offset);
    const authors = await findAuthorsByIdUser(id);
    const tags = await findTopTagNames();
    const users = await findUsersByIdUser(id);
    const preferences = await getUserPreferencesByIdUser(id);

    return res.render('pages/profile/profilePage', { 
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

const getTotalCommentsForProfile = async (req) => await countCommentsByUserId(req.user.id);

export const getProfileWithPagination = [
    validateWebPagination(getTotalCommentsForProfile, 10),
    getProfile
]