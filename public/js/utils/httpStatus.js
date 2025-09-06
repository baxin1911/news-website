import { showErrorToast, showFormErrorToast, showServerErrorToast, showSuccessToast, showNoContentToast } from "./messages.js";

export const checkSuccessStatusCodes = (response) => {

    const { status, data } = response;

    if (status === 204 || data.notices.length === 0) {

        showNoContentToast(data);
        return;
    }

    showSuccessToast(data);
    return;
}

export const checkErrorStatusCodes = (err, options = {}) => {

    const { status, data } = err;

    if (status) {
    
        if (status === 400) {

            showFormErrorToast(data);
            options.showFormErrors(data);
            return;
            
        } else if (status === 401) {

            options.showFormErrors(data);
            return;
        }

        showServerErrorToast(data);

        return;

    }

    showErrorToast();
}