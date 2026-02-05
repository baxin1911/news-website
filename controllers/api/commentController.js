import { createReactionDtoForCommentDislike, createReactionDtoForCommentLike } from "../../dtos/reactionDTO.js";
import { errorCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";
import { existsCommentByCommentId } from "../../services/commentService.js";
import { toggleReactionWithOpposite } from "../../services/reactionService.js";

const toggleCommentLike = async (req, res) => {

    const { id } = req.user;
    let { id: commentId } = req.params;
    commentId = Number(commentId);
    const reactionDto = createReactionDtoForCommentLike(id, commentId);
    const result = await toggleReactionWithOpposite(reactionDto)

    return res.status(200).json({ code: successCodeMessages.UPDATED_REACTION, result });
}

const toggleCommentDislike = async (req, res) => {

    const { id } = req.user;
    let { id: commentId } = req.params;
    commentId = Number(commentId);
    const reactionDto = createReactionDtoForCommentDislike(id, commentId);
    const result = await toggleReactionWithOpposite(reactionDto)

    return res.status(200).json({ code: successCodeMessages.UPDATED_REACTION, result });
}

const actions = {
    like: toggleCommentLike,
    dislike: toggleCommentDislike
}

export const activateCommentAction = async (req, res) => {

    let { id, action } = req.params;
    id = Number(id);

    if (isNaN(id)) return res.status(400).json({ code: errorCodeMessages.INVALID_ENTITY_ID });
    
    const existsComment = await existsCommentByCommentId(id);

    if (!existsComment) return res.status(404).json({ code: errorCodeMessages.ENTITY_NOT_FOUND });

    const handler = actions[action];

    if (!handler) return res.status(400).json({ code: errorCodeMessages.INVALID_ACTION });

    return handler(req, res);
}