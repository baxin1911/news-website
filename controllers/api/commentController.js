import { createCommentDtoForRegister } from "../../dtos/commentDTO.js";
import { createReactionDtoForComment } from "../../dtos/reactionDTO.js";
import { errorCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";
import { existsCommentByCommentId, saveComment } from "../../services/commentService.js";
import { toggleReactionWithOpposite } from "../../services/reactionService.js";
import sanitizeHtml from 'sanitize-html';

const toggleCommentLike = async (req, res) => {

    const reactionDto = createReactionDtoForComment(req.user.id, req.params);

    const result = await toggleReactionWithOpposite(reactionDto);

    return res.status(200).json({ 
        code: successCodeMessages.UPDATED_REACTION, 
        result 
    });
}

const toggleCommentDislike = async (req, res) => {

    const reactionDto = createReactionDtoForComment(req.user.id, req.params);

    const result = await toggleReactionWithOpposite(reactionDto);

    return res.status(200).json({ 
        code: successCodeMessages.UPDATED_REACTION, 
        result 
    });
}

const actions = {
    like: toggleCommentLike,
    dislike: toggleCommentDislike
}

export const activateCommentAction = async (req, res) => {

    let { id, action } = req.params;
    
    const existsComment = await existsCommentByCommentId(id);

    if (!existsComment) return res.status(404).json({ code: errorCodeMessages.ENTITY_NOT_FOUND });

    const handler = actions[action];

    if (!handler) return res.status(400).json({ code: errorCodeMessages.INVALID_ACTION });

    return handler(req, res);
}

export const createComment = async (req, res) => {

    const { body } = req;
    const clean = sanitizeHtml(body.message, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'span']),
        allowedAttributes: {
            a: ['href', 'target'],
            img: ['src', 'alt'],
            span: ['class','data-id']
        }
    });
    body.message = clean;
    const commentDto = createCommentDtoForRegister(req.user.id, body);
    
    const comment = await saveComment(commentDto);

    return res.status(200).json({ 
        code: successCodeMessages.CREATED_COMMENT,
        comment
    });
}