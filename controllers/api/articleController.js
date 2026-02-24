import { errorCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";
import { existsArticleByArticleId } from "../../services/articleService.js";
import { toggleReactionWithOpposite } from "../../services/reactionService.js";
import { toggleBookmark } from "../../services/bookmarkService.js";
import { createBookmarkDto } from "../../dtos/bookmarkDTO.js";
import { createReactionDtoForArticle } from "../../dtos/reactionDTO.js";

const toggleArticleLike = async (req, res) => {

    const reactionDto = createReactionDtoForArticle(req.user.id, req.params);
    
    const result = await toggleReactionWithOpposite(reactionDto);

    return res.status(200).json({ code: successCodeMessages.UPDATED_REACTION, result });
}

const toggleArticleBookmark = async (req, res) => {

    const bookmarkDto = createBookmarkDto(req.user.id, req.params.id);
    
    const isSaved = await toggleBookmark(bookmarkDto);

    return res.status(200).json({ code: successCodeMessages.UPDATED_BOOKMARK, isSaved });
}

const actions = {
    like: toggleArticleLike,
    bookmark: toggleArticleBookmark
}

export const activateArticleAction = async (req, res) => {

    let { id, action } = req.params;

    const existsArticle = await existsArticleByArticleId(id);

    if (!existsArticle) return res.status(404).json({ code: errorCodeMessages.ENTITY_NOT_FOUND });

    const handler = actions[action];

    if (!handler) return res.status(400).json({ code: errorCodeMessages.INVALID_ACTION });

    return handler(req, res);
}