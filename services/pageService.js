import { existsReaction } from "./reactionService.js";
import { findTopTagNames } from "./tagService.js";
import { existsBookmark } from "./bookmarkService.js";
import { getAllCategories } from "./categoryService.js";
import { findArticlesByQuery, getAllArticles, getArticleByTitle } from "./articleService.js";
import { findCommentsByArticleId, findCommentsByUserId } from "./commentService.js";
import { unslugify } from "../utils/formattersUtils.js";
import { getProfileByUserId } from "./profileService.js";
import { createBookmarkDto } from "../dtos/bookmarkDTO.js";
import { createReactionDtoForArticle } from "../dtos/reactionDTO.js";
import { findUsersByUserId, getUsernameByUserId } from "./userService.js";
import { findAuthorsByUserId } from "./authorService.js";
import { getUserPreferencesByUserId } from "./preferencesService.js";
import { InvalidAuthError } from "../errors/authError.js";
import { createSearchDtoForSearchSettings } from "../dtos/searchDTO.js";
import { existsGameByName, getGameByName } from "./gameService.js";

export const getHomePage = async ({ user }) => {

    let profile = null;

    if (user) profile = await getProfileByUserId(user.id);

    const articles = await getAllArticles();
    const tags = await findTopTagNames();

    return {
        articles,
        tags,
        profile
    };
}

export const getArticlePage = async ({

    user,
    slug,
    pageSettings

}) => {

    let profile = null;
    
    if (user) profile = await getProfileByUserId(user.id);

    const text = unslugify(slug);
    const { offset, pagination, itemsPerPage } = pageSettings;

    const article = await getArticleByTitle(text);
    
    article.isSaved = false;
    article.isLiked = false;

    if (user) {

        const bookmarkDTO = createBookmarkDto(user.id, article.id);

        article.isSaved = await existsBookmark(bookmarkDTO);

        const reactionDTO = createReactionDtoForArticle(user.id, article.id);

        article.isLiked = await existsReaction(reactionDTO);
    }
    
    const comments = await findCommentsByArticleId(article.id, itemsPerPage, offset);
    const tags = await findTopTagNames();
    const articles = await getAllArticles();
    const categories = await getAllCategories();

    return {
        article,
        profile,
        tags,
        articles, 
        categories,
        comments,
        pagination
    };
}

export const getProfilePage = async ({ user, pageSettings }) => {

    const { id } = user;

    const profile = await getProfileByUserId(id);

    if (!profile)  throw new InvalidAuthError();

    profile.username = await getUsernameByUserId(id);
    const { offset, pagination, itemsPerPage } = pageSettings;
    const comments = await findCommentsByUserId(id, itemsPerPage, offset);
    const authors = await findAuthorsByUserId(id);
    const tags = await findTopTagNames();
    const users = await findUsersByUserId(id);
    const preferences = await getUserPreferencesByUserId(id);

    return {
        profile,
        comments,
        tags,
        users,
        authors, 
        preferences,
        pagination
    };
}

export const getContactPage = async ({ user }) => {

    let profile = null;

    if (user) profile = await getProfileByUserId(user.id);

    const categories = getAllCategories();
    const tags = findTopTagNames();

    return {
        profile,
        tags,
        categories
    };
}

export const getSearchFeedPage = async ({ user, q, pageSettings }) => {

    let profile = null;
    
    if (user) profile = await getProfileByUserId(user.id);

    const { offset, pagination } = pageSettings;
    const searchDto = createSearchDtoForSearchSettings(q, offset);

    const articles = await findArticlesByQuery(searchDto);
    const tags = await findTopTagNames();
    const categories = await getAllCategories();

    return {
        profile,
        articles,
        tags,
        categories,
        game: null,
        pagination
    };
}

export const getTagFeedPage = async ({ user, tag, pageSettings }) => {

    let existsGame = await existsGameByName(tag);

    let game = null;

    if (existsGame) game = await getGameByName(tag);

    const data = await getSearchFeedPage({ user, q: tag, pageSettings });

    return {
        ...data,
        game
    };
}