import { getErrorMessage, getSuccessMessage } from "../constants/apiMessages.js";
import { showModal } from "../plugins/swal/baseSwal.js";
import { notifications } from "../plugins/swal/swalComponent.js";

export const handleSuccessResponse = (response, onSuccess) => {

    const { status, data } = response;

    if (status === 204) return;

    const code = data.code;
    const successMessage = getSuccessMessage(code);

    switch (code) {

        case 'SENDED_RECOVER_EMAIL':
        case 'CREATED_ACCOUNT':
            onSuccess.closeModal();
            notifications.showSuccess(successMessage);
            break;

        case 'SENDED_NEWSLETTER_EMAIL':
        case 'CREATED_CONTACT':
            notifications.showSuccess(successMessage);
            onSuccess.resetForm();
            break;
        
        case 'UPDATED_RESET_PASSWORD':
        case 'UPDATED_ACCOUNT_PASSWORD':
            onSuccess.redirect();
            notifications.showSuccess(successMessage);
            break;
        
        case 'UPDATED_ACCOUNT':
        case 'UPDATED_PREFERENCES':
            localStorage.setItem('showSuccessToast', successMessage);
            onSuccess.reload();
            break;
        
        default:
            notifications.showSuccess(successMessage);
    }
}

export const handleErrorResponse = (response, onError) => {

    const { data, status } = response;

    if (!status) {
        
        showErrorToast();

        return;
    }

    const errorMessage = getErrorMessage(data.code);

    switch (status) {

        case 400:
            notifications.showWarning(errorMessage);
            onError.showFormErrors(data.errors);
            break;

        case 401:
            window.location.replace('/');
            notifications.showError(errorMessage);
            break;

        case 429:
            notifications.showWarning(errorMessage);
            break;

        default:
            showModal();
    }
}