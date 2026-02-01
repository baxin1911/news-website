import { createReactionDtoForArticleLike } from "../../dtos/reactionDTO.js";
import { successCodeMessages } from "../../messages/codeMessages.js";
import { existsArticleByArticleId } from "../../services/articleService.js";
import { toggleReactionWithOpposite } from "../../services/reactionService.js";

const toggleArticleLike = async (req, res) => {

    const { id } = req.user;
    let { id: articleId } = req.params;
    articleId = Number(articleId);
    const reactionDto = createReactionDtoForArticleLike(id, articleId);
    const result = await toggleReactionWithOpposite(reactionDto)

    return res.status(200).json({ code: successCodeMessages.LIKED_ARTICLE, result });
}

const actions = {
    like: toggleArticleLike
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