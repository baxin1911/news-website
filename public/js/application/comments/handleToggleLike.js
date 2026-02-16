import { handleActionCommentRequest } from "../../api/commentApi.js";
import { updateButtonState } from "../../ui/buttonUI.js";
import { handleToggleAction } from "../shared/handleToggleAction.js";

export const handleToggleLike = async (btn) => {

    try {

        const response = await handleToggleAction({
            btn,
            handler: handleActionCommentRequest
        });
        const { result } = response.data;
        const { id } = btn.dataset;

        updateButtonState(btn, {
            isActive: result.isActive,
            delta: result.delta,
            icon: 'fa-thumbs-up',
            solid: result.isLiked
        });

        const oppositeBtn = document.querySelector(
            `button[data-action="dislike"][data-type="comment"][data-id="${ id }"]`
        );

        if (oppositeBtn) updateButtonState(oppositeBtn, {
            isActive: false,
            delta: result.oppositeDelta,
            icon: 'fa-thumbs-down',
            solid: false
        });

    } catch (error) {

        throw error;
    }
}