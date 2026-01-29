import { notifications } from "../plugins/swal/swalComponent.js";
import { handleFlashMessage, handleModalWithFlashMessage } from "../handlers/flashMessageHandler.js";

const backToTopBtn = document.querySelector('.back-to-top');

backToTopBtn.setAttribute('aria-hidden', 'true');

window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {

        backToTopBtn.setAttribute('aria-hidden', 'false');
        backToTopBtn.classList.add('visible');

    } else {

        backToTopBtn.setAttribute('aria-hidden', 'true');
        backToTopBtn.classList.remove('visible');
    }
});

document.querySelector('.back-to-top').addEventListener('click', (e) => {

    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {

    handleFlashMessage(window.FLASH_MESSAGE || null);
    handleModalWithFlashMessage(window.FLASH_MESSAGE || null);

    const successMessage = localStorage.getItem('showSuccessToast');

    if (successMessage) {
        
        notifications.showSuccess(successMessage);
        localStorage.removeItem('showSuccessToast');
    }
});