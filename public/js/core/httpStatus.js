import { showErrorToast, showFormWarningToast, showServerErrorToast, showSuccessToast, showNoContentToast, showRateLimitWarningToast } from "../ui/swalUI.js";

export const checkSuccessStatusCodes = (response) => {

    const { status, data } = response;

    if (status === 204 || data.notices?.length === 0) {

        showNoContentToast(data);
        return;
    }

    showSuccessToast(data.message);
}

export const checkErrorStatusCodes = (err, options = {}) => {

    const { status, data } = err;

    if (status) {
    
        if (status === 400) {

            showFormWarningToast(data);
            options.showFormErrors(data);
            return;
            
        } else if (status === 401) {

            options.showFormErrors(data);
            return;

        } else if (status === 429) {

            showRateLimitWarningToast(data);
            return;
        }

        showServerErrorToast(data);
        return;

    }

    showErrorToast();
}