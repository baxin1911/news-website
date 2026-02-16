import { handleToggleDislike } from "../../../application/comments/handleToggleDislike.js";
import { handleToggleLike } from "../../../application/comments/handleToggleLike.js";
import { on } from "../../../utils/domUtils.js";

export const initCommentActions = () => {

    on({
        event: 'click', 
        selector: '.action-button[data-type="comment"][data-action="like"]', 
        handler: async (e, btn) => await handleToggleLike(btn)
    });

    on({
        event: 'click', 
        selector: '.action-button[data-type="comment"][data-action="dislike"]', 
        handler: async (e, btn) => await handleToggleDislike(btn)
    });
}