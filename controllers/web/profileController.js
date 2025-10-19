import { getAuthorsByIdUser } from "../../services/authorService.js";
import { getUsersByIdUser } from "../../services/userService.js";
import { getTagsByIdUser } from "../../services/tagService.js";
import { getCommentsByIdUser } from "../../services/commentService.js";


export const profileController = async (req, res) => {

    // Get user form BD

    const { user } = req;

    const authors = await getAuthorsByIdUser(user.id);
    const users = await getUsersByIdUser(user.id);
    const tags = await getTagsByIdUser(user.id);
    const comments = await getCommentsByIdUser(user.id);

    res.render('profile', { 
        user, 
        comments,
        users,
        authors, 
        tags,
        currentRoute: '/profile'
    });
}