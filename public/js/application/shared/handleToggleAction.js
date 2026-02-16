import { getErrorMessage } from "../../constants/errorMessages.js";
import { notifications } from "../../plugins/swal/swalComponent.js";
import { setButtonError, setLoadingState } from "../../ui/buttonUI.js";
import { showModal } from "../../ui/modalUI.js";

export const handleToggleAction = async ({ btn, handler }) => {

    if (btn.dataset.loading) return;

    const { action, id } = btn.dataset;

    const data = { action, id };

    setLoadingState(btn, true);

    try {

        const response = await handler(data);

        return response;

    } catch (error) {

        if (error.response.status === 400) {

            const message = getErrorMessage(error.response.data.code);
            notifications.showError(message);
            setButtonError(btn);
            return;
        }

        if (error.response.status === 401) {

            const message = getErrorMessage(error.response.data.code);
            showModal('loginModal');
            notifications.showError(message);
            return;
        }

        throw error;

    } finally {

        setLoadingState(btn, false);
        btn.blur();
    }
};