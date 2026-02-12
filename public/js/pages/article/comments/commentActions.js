import { activateCommentAction } from "../../../api/commentApi.js";
import { handlerToggleAction } from "../../../application/toggleAction.js";
import { updateButtonState } from "../../../ui/buttonUI.js";
import { on } from "../../../utils/domUtils.js";

export const initCommentActions = () => {

    on('click', '.action-button[data-type="comment"]', async (e, btn) => {

        handlerToggleAction({
            handler: activateCommentAction, 
            onSuccess: {
                updateCount: (result) => {

                    updateButtonState(btn, {
                        isActive: result.isActive,
                        delta: result.delta,
                        icon: action === 'like' ? 'fa-thumbs-up' : 'fa-thumbs-down',
                        solid: action === 'like' ? result.isLiked : result.isDisliked
                    });

                    const oppsiteAction = action === 'like' ? 'dislike' : 'like';
                    const oppositeBtn = document.querySelector(`button[data-action="${ oppsiteAction }"][data-type="${ type }"][data-id="${ id }"]`);

                    if (oppositeBtn) updateButtonState(oppositeBtn, {
                        isActive: false,
                        delta: result.oppositeDelta,
                        icon: oppositeBtn.dataset.action === 'dislike' ? 'fa-thumbs-down' : 'fa-thumbs-up',
                        solid: false
                    });
                }
            }
        });
    });
}