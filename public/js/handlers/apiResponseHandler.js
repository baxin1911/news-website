import { getErrorMessage, getInfoMessage, getSuccessMessage } from "../constants/apiMessages.js";
import { notifications } from "../plugins/swal/swalComponent.js";
import { showModal } from "../ui/modalUI.js";

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

        case 'CREATED_COMMENT':
            notifications.showSuccess(successMessage);
            onSuccess.resetForm();
            onSuccess.appendComment(data.comment);
            break;
        
        case 'SUCCESS_LOGIN':
        case 'UPDATED_RESET_PASSWORD':
        case 'UPDATED_ACCOUNT_PASSWORD':
            localStorage.setItem('showSuccessToast', successMessage);
            onSuccess.redirect();
            break;
        
        case 'UPDATED_ACCOUNT':
        case 'UPDATED_PREFERENCES':
            localStorage.setItem('showSuccessToast', successMessage);
            onSuccess.reload();
            break;

        case 'UPDATED_REACTION':
            onSuccess.updateCount(data.result);
            break;

        case 'UPDATED_BOOKMARK':
            onSuccess.updateBookmark(data.isSaved);
            break;

        case 'SUCCESS_MENTIONED_USER':
            onSuccess.showMentionedUser(data.users);
            break;

        case 'SUCCESS_SEARCH':
            onSuccess.updateNews({ 
                articles: data.articles, 
                pagination: data.pagination,
                q: data.q
            });
            notifications.showSuccess(successMessage);
            break;

        case 'NO_CONTENT_SEARCH':
            const message = getInfoMessage(data.code);
            onSuccess.updateNews({
                articles: data.articles,
                q: data.q,
                message
            });
            break;
        
        default:
            break;
    }
}

export const handleErrorResponse = (response, onError, context = 'nav') => {

    const { data, status } = response;

    if (!status) {
        
        showErrorToast();

        return;
    }

    const errorMessage = getErrorMessage(data.code);

    switch (status) {

        case 400:
            if (context === 'action') onError.showButtonError();
            
            if (context === 'mention') {

                onError.showUndefinedUser();
                break;
            }
            
            notifications.showWarning(errorMessage);
            onError.showFormErrors?.(data.errors);
            break;

        case 401:
            if (context === 'action') showModal('loginModal');
            else window.location.replace('/');

            notifications.showError(errorMessage);
            break;

        case 429:
            notifications.showWarning(errorMessage);
            break;

        default:
            showModal();
    }
}