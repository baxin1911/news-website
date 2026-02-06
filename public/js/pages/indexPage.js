import { notifications } from "../plugins/swal/swalComponent.js";
import { handleFlashMessage, handleModalWithFlashMessage } from "../handlers/flashMessageHandler.js";
import { on } from "../utils/domUtils.js";

const backToTopBtnSelector = '.back-to-top';
const backToTopBtn = document.querySelector(backToTopBtnSelector);

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

on('click', backToTopBtnSelector, (e, btn) => {

    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

handleFlashMessage(window.FLASH_MESSAGE || null);
handleModalWithFlashMessage(window.FLASH_MESSAGE || null);

const successMessage = localStorage.getItem('showSuccessToast');

if (successMessage) {
    
    notifications.showSuccess(successMessage);
    localStorage.removeItem('showSuccessToast');
}

document.querySelectorAll('.dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('button[data-mdb-dropdown-init]');
    const instance = mdb.Dropdown.getOrCreateInstance(btn);
    dropdown.addEventListener('mouseenter', () => {
        instance.show();
    });
    dropdown.addEventListener('mouseleave', () => {
        instance.hide();
        btn.blur();
    });
});