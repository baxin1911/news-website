import { handleFlashMessage, handleModalWithFlashMessage } from "../../handlers/flashMessageHandler.js";
import { notifications } from "../../plugins/swal/swalComponent.js";
import { initHomeSwiper } from "../../plugins/swiper/homeSwiper.js";

initHomeSwiper();

document.addEventListener('DOMContentLoaded', () => {

    handleFlashMessage(window.FLASH_MESSAGE || null);
    handleModalWithFlashMessage(window.FLASH_MESSAGE || null);

    const successMessage = localStorage.getItem('showSuccessToast');

    if (successMessage) {
        
        notifications.showSuccess(successMessage);
        localStorage.removeItem('showSuccessToast');
    }
});