import { errorCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";
import { existsArticleByArticleId } from "../../services/articleService.js";
import { toggleReactionWithOpposite } from "../../services/reactionService.js";
import { toggleBookmark } from "../../services/bookmarkService.js";

const toggleArticleLike = async (req, res) => {

    const body = {
        userId: req.user.id,
        entityId: Number(req.params.id),
        reactionType: req.params.action,
        entityType: 'article'
    };
    
    const result = await toggleReactionWithOpposite(body);

    return res.status(200).json({ code: successCodeMessages.UPDATED_REACTION, result });
}

const toggleArticleBookmark = async (req, res) => {

    const body = {
        userId: req.user.id,
        articleId: Number(req.params.id)
    };
    
    const isSaved = await toggleBookmark(body);

    return res.status(200).json({ code: successCodeMessages.UPDATED_BOOKMARK, isSaved });
}

const actions = {
    like: toggleArticleLike,
    bookmark: toggleArticleBookmark
}

export const activateArticleAction = async (req, res) => {

    let { id, action } = req.params;
    id = Number(id);

    if (isNaN(id)) return res.status(400).json({ code: errorCodeMessages.INVALID_ENTITY_ID });

    const existsArticle = await existsArticleByArticleId(id);

    if (!existsArticle) return res.status(404).json({ code: errorCodeMessages.ENTITY_NOT_FOUND });

    const handler = actions[action];

    if (!handler) return res.status(400).json({ code: errorCodeMessages.INVALID_ACTION });

    return handler(req, res);
}