import { handleToggleBookmark } from "../../application/article/handleToggleBookmark.js";
import { handleToggleLike } from "../../application/article/handleToggleLike.js";
import { on } from "../../utils/domUtils.js";

export const initArticleActions = () => {

    on({
        event: 'click', 
        selector: '.action-button[data-type="article"][data-action="like"]', 
        handler: async (e, btn) => await handleToggleLike(btn)
    });

    on({
        event: 'click', 
        selector: '.action-button[data-type="article"][data-action="bookmark"]', 
        handler: async (e, btn) => await handleToggleBookmark(btn)
    });
}