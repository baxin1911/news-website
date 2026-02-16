import { handleActionArticleRequest } from "../../api/articleApi.js";
import { updateButtonState } from "../../ui/buttonUI.js";
import { handleToggleAction } from "../shared/handleToggleAction.js";

export const handleToggleBookmark = async (btn) => {

    try {

        const response = await handleToggleAction({
            btn,
            handler: handleActionArticleRequest
        });
        const { isSaved } = response.data;

        const span = btn.querySelector('span');

        if (span) span.textContent = isSaved ? 'Guardado' : 'Guardar';

        updateButtonState(btn, {
            isActive: isSaved,
            icon: 'fa-bookmark',
            solid: isSaved
        });

    } catch (error) {

        throw error;
    }
}