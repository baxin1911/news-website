import { findAuthorsByIdUser } from "../../services/authorService.js";
import { findUsersByIdUser } from "../../services/userService.js";
import { findTopTagNames } from "../../services/tagService.js";
import { countCommentsByUserId, findCommentsByUserId } from "../../services/commentService.js";
import { getProfileByIdUser, getProfilePreferencesByIdUser } from "../../services/profileService.js";
import { redirectWithFlash } from "../../utils/flashUtils.js";
import { errorMessages } from "../../messages/messages.js";
import { errorCodeMessages } from "../../messages/codeMessages.js";
import { formatLongDate, slugify } from "../../utils/formattersUtils.js";
import { validatePagination } from "../../middleware/validatorMiddleware.js";

export const getProfile = async (req, res) => {

    // Get user form BD

    const { user } = req;
    const profile = await getProfileByIdUser(user.id);

    if (!profile)  return redirectWithFlash(
        res, 
        errorMessages.INVALID_AUTH, 
        errorCodeMessages.INVALID_AUTH, 
        'error'
    );

    const { offset, pagination, itemsPerPage } = req.pageSettings;
    const comments = await findCommentsByUserId(user.id, itemsPerPage, offset);
    const authors = await findAuthorsByIdUser(user.id);
    const tags = await findTopTagNames();
    const users = await findUsersByIdUser(user.id);
    const preferences = await getProfilePreferencesByIdUser(user.id);

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

const getTotalCommentsForProfile = async (req) => await countCommentsByUserId(req.user.id);

export const getProfileWithPagination = [
    validatePagination(getTotalCommentsForProfile, 10),
    getProfile
]