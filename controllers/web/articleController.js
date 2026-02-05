import { validateWebPagination } from "../../middleware/validatorMiddleware.js";
import { getAllArticles, getArticleByTitle } from "../../services/articleService.js";
import { existsBookmark } from "../../services/bookmarkService.js";
import { getAllCategories } from "../../services/categoryService.js";
import { countCommentsByArticleId, findCommentsByArticleId } from "../../services/commentService.js";
import { getProfileByIdUser } from "../../services/userService.js";
import { findTopTagNames } from "../../services/tagService.js";
import { getCategory } from "../../utils/categoryUtils.js";
import { formatLongDate, formatShortDate, formatRelativeDate, slugify, unslugify } from "../../utils/formattersUtils.js";
import { existsReaction } from "../../services/reactionService.js";
import { createReactionDtoForArticleLike } from "../../dtos/reactionDTO.js";
import { createBookmarkDto } from "../../dtos/bookmarkDTO.js";

export const showArticle = async (req, res) => {

    const { user } = req;
    let profile = null;

    if (user) profile = await getProfileByIdUser(user.id);

    const { slug } = req.params;
    const text = unslugify(slug);
    const { offset, pagination, itemsPerPage } = req.pageSettings;
    const article = await getArticleByTitle(text);
    article.isSaved = false;
    article.isLiked = false;

    if (user) {

        const bookmarkDTO = createBookmarkDto(user.id, article.id);
        article.isSaved = await existsBookmark(bookmarkDTO);
        const reactionDTO = createReactionDtoForArticleLike(user.id, article.id);
        article.isLiked = await existsReaction(reactionDTO);
    }
    
    const comments = await findCommentsByArticleId(article.id, itemsPerPage, offset);
    const tags = await findTopTagNames();
    const articles = await getAllArticles();
    const categories = await getAllCategories();

    return res.render('pages/article/articlePage', {
        article,
        profile,
        tags,
        articles, 
        categories,
        comments,
        queryParams: {},
        currentRoute: slug,
        pagination,
        slugify,
        getCategory, 
        formatShortDate,
        formatRelativeDate,
        formatLongDate
    });
}

const getTotalCommentsForArticle = async (req) => {
    
    const text = unslugify(req.params.slug);
    const article = await getArticleByTitle(text);
    const count = await countCommentsByArticleId(article.id);
    
    return count;
}

export const showArticleWithPagination = [
    validateWebPagination(getTotalCommentsForArticle, 5),
    showArticle
];