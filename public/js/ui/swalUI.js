import { messages } from "../core/messages.js";
import { showModal } from "./modalUI.js";

const showToast = (title, text, icon) => {

    Swal.fire({
        toast: true,
        position: 'top-end',
        title,
        text,
        icon,
        showConfirmButton: false,
        timer: 3000
    });
}

const showErrorMessage = (text) => {

    Swal.fire({
        title: 'Error del servidor',
        text: text || 'Error de conexión con el servidor',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const showWarningToast = (title) => showToast(title, null, 'warning');

export const showFormWarningToast = (data) => showToast('Campos incorrectos', data.message, 'warning');

export const showRateLimitWarningToast = (data) => showToast('Demasiados intentos', data.message, 'warning');

export const showSuccessToast = (title) => showToast(title, null, 'success');

export const showNoContentToast = (data) => showToast('Sin resultados encontrados', null, 'info');

export const showLoginRequiredToast = (title) => showToast(title, null, 'error');

export const showServerErrorToast = (data) => showErrorMessage(data.message);

export const showErrorToast = (title) => showErrorMessage(null);

export const toggleErrorMessages = (form, errors) => {

    const inputs = form.querySelectorAll('input');

    Object.entries(errors).forEach(([id, message], index) => {

        const element = document.getElementById(id);

        if (message) {

            element.textContent = message;
            inputs[index].classList.add('is-invalid');

        } else {

            element.textContent = null;
            inputs[index].classList.remove('is-invalid');
        }
    });
}

export const handlerFlashMessage = (flash) => {
    
    if (!flash) return;

    const { message, type, code } = flash;

    switch (type) {
        case 'success':
            showSuccessToast(message || messages[code]);
            break;
        case 'warning':
            showWarningToast(message || messages[code]);
            break;
        case 'error':
            showLoginRequiredToast(message || messages[code]);
            break;
        default:
            break;
    }
}