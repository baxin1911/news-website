import { countCommentsByUserId } from "../../services/commentService.js";
import { formatLongDate, slugify } from "../../utils/formattersUtils.js";
import { validateWebPagination } from "../../middleware/validatorMiddleware.js";
import { getProfilePage } from "../../services/pageService.js";
import { InvalidAuthError } from "../../errors/authError.js";
import { redirectWithFlash } from '../../utils/flashUtils.js';

export const getProfile = async (req, res) => {

    try {

        const { user, pageSettings } = req;

        const data = await getProfilePage({ user, pageSettings });

        return res.render('pages/profile/profilePage', { 
            ...data,
            queryParams: {},
            currentRoute: '/profile',
            slugify,
            formatLongDate
        });

    } catch (error) {

        if (error instanceof InvalidAuthError) return redirectWithFlash(
            res, 
            error.message, 
            error.code, 
            'error'
        );

        throw error;
    }
}

const getTotalCommentsForProfile = async (req) => await countCommentsByUserId(req.user.id);

export const getProfileWithPagination = [
    validateWebPagination(getTotalCommentsForProfile, 10),
    getProfile
]