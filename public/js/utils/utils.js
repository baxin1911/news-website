import { showErrorMessage, showServerErrorMessage } from "./messages.js";

export const checkStatusCodes = (err, options = {}) => {

    const { status, data } = err;

    if (status) {
    
        if (status === 400) {

            options.showFormErrors(data);
            return;
            
        } else if (status === 401) {

            options.showFormErrors(data);
            return;
        }

        showServerErrorMessage(data);

        return;

    }

    showErrorMessage();
}

export const toggleErrorMessages = (errors) => {

    Object.entries(errors).forEach(([id, message]) => {

        const element = document.getElementById(id);

        if (message) {

            element.textContent = message;
            element.hidden = false;
            element.ariaHidden = false;

        } else {

            element.textContent = null;
            element.hidden = true;
            element.ariaHidden = true;
        }
    });
}

export const closeModal = (idModal, form) => {
    const modalHtml = document.getElementById(idModal);
    const modal = bootstrap.Modal.getOrCreateInstance(modalHtml);

    modalHtml.addEventListener('hidden.bs.modal', () => {
        form.reset();
    });
    modal.hide();
}