import { errorCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";
import { existsCommentByCommentId, saveComment } from "../../services/commentService.js";
import { toggleReactionWithOpposite } from "../../services/reactionService.js";
import sanitizeHtml from 'sanitize-html';

const toggleCommentLike = async (req, res) => {

    const result = await toggleReactionWithOpposite(req.body)

    return res.status(200).json({ code: successCodeMessages.UPDATED_REACTION, result });
}

const toggleCommentDislike = async (req, res) => {

    const result = await toggleReactionWithOpposite(req.body)

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

    const body = {};
    body.entityType = 'comment';
    body.entityId = id;
    body.userId = req.user.id;
    body.reactionType = action;
    req.body = body;

    return handler(req, res);
}

export const createComment = async (req, res) => {

    const { body } = req;
    body.userId = req.user.id;
    const clean = sanitizeHtml(body.message, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
            a: ['href', 'target'],
            img: ['src', 'alt']
        }
    });
    body.message = clean;
    const comment = await saveComment(body);

    return res.status(200).json({ 
        code: successCodeMessages.CREATED_COMMENT,
        comment
    });
}