import { getErrorMessage, getSuccessMessage } from "../constants/apiMessages.js";
import { showModal } from "../ui/modalUI.js";
import { showLoginRequiredToast, showSuccessToast, showWarningToast } from "../ui/swalUI.js";

export const handleFlashMessage = (flash) => {
    
    if (!flash) return;

    const { message, type, code } = flash;

    switch (type) {

        case 'success':
            showSuccessToast(message || getSuccessMessage(code));
            break;

        case 'warning':
            showWarningToast(message || getErrorMessage(code));
            break;

        case 'error':
            showLoginRequiredToast(message || getErrorMessage(code));
            break;
            
        default:
            break;
    }
}

export const handleModalWithFlashMessage = (flash) => {

    if (!flash) return;

    const { code } = flash;

    switch (code) {

        case 'LOGIN_ERROR_GOOGLE':
            showModal('loginModal');
            break;
            
        default:
            break;
    }
}