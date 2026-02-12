import { activateCommentAction } from "../../api/commentApi.js";
import { handlerToggleAction } from "../../application/toggleAction.js";
import { updateButtonState } from "../../ui/buttonUI.js";
import { on } from "../../utils/domUtils.js";

export const initArticleActions = () => {

    on('click', '.action-button[data-type="article"]', async (e, btn) => {

        handlerToggleAction({
            handler: activateCommentAction, 
            onSuccess: {
                updateBookmark: (isSaved) => {
                
                    const span = btn.querySelector('span');

                    if (span) span.textContent = isSaved ? 'Guardado' : 'Guardar';

                    updateButtonState(btn, {
                        isActive: isSaved,
                        icon: 'fa-bookmark',
                        solid: isSaved
                    });
                },
                updateCount: (result) => {

                    updateButtonState(btn, {
                        isActive: result.isActive,
                        delta: result.delta,
                        icon: action === 'like' ? 'fa-thumbs-up' : 'fa-thumbs-down',
                        solid: action === 'like' ? result.isLiked : result.isDisliked
                    });
                }
            }
        });
    });
}