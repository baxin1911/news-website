import { handleActionArticleRequest } from "../../api/articleApi.js";
import { updateButtonState } from "../../ui/buttonUI.js";
import { handleToggleAction } from "../shared/handleToggleAction.js";

export const handleToggleLike = async (btn) => {

    try {

        const response = await handleToggleAction({
            btn,
            handler: handleActionArticleRequest
        });
        const { result } = response.data;

        updateButtonState(btn, {
            isActive: result.isActive,
            delta: result.delta,
            icon: 'fa-thumbs-up',
            solid: result.isLiked
        });

    } catch (error) {

        throw error;
    }
}