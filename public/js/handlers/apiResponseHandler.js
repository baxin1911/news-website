import { getErrorMessage, getSuccessMessage } from "../constants/apiMessages.js";
import { showModal } from "../plugins/swal/baseSwal.js";
import { notifications } from "../plugins/swal/swalComponent.js";

export const handleSuccessResponse = (response) => {

    const { status, data } = response;

    if (status === 204) return;

    const successMessage = getSuccessMessage(data.code);

    notifications.showSuccess(successMessage);
}

export const handleErrorResponse = (response, options = {}) => {

    const { data, status } = response;

    if (!status) {
        
        showErrorToast();

        return;
    }

    const errorMessage = getErrorMessage(data.code);

    switch (status) {

        case 400:
            notifications.showWarning(errorMessage);
            options.showFormErrors(data.errors);
            break;

        case 401:
            notifications.showError(errorMessage);
            break;

        case 429:
            notifications.showWarning(errorMessage);
            break;

        default:
            showModal();
    }
}