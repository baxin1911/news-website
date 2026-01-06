import { getErrorMessage, getSuccessMessage } from "../constants/apiMessages.js";
import { showErrorToast, showFormWarningToast, showServerErrorToast, showSuccessToast, showNoContentToast, showRateLimitWarningToast, showLoginRequiredToast } from "../ui/swalUI.js";

export const handleSuccessResponse = (response) => {

    const { status, data } = response;

    if (status === 204) {

        showNoContentToast();
        
        return;
    }

    const successMessage = getSuccessMessage(data.code);

    showSuccessToast(successMessage);
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
            showFormWarningToast(errorMessage);
            options.showFormErrors(data);
            break;

        case 401:
            showLoginRequiredToast(errorMessage);
            break;

        case 429:
            showRateLimitWarningToast(data);
            break;

        default:
            showServerErrorToast();
    }
}