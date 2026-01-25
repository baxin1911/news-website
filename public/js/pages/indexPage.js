import { handleFlashMessage, handleModalWithFlashMessage } from "../handlers/flashMessageHandler.js";
import { notifications } from "../plugins/swal/swalComponent.js";

const swiper1 = new Swiper( '.main-news', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    speed: 500,
    slidesPerView: 1,
    centeredSlides: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});

const swiper2 = new Swiper( '.latest-news', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    speed: 500,
    slidesPerView: 1,
    centeredSlides: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});

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

const activeTabFromHash = () => {
    const hash = window.location.hash;

    if (!hash) return;

    const tabButton = document.querySelector(`${ hash }`);

    if (!tabButton) return;

    if (window.mdb) {

        const tabInstance = mdb.Tab.getOrCreateInstance(tabButton);
        tabInstance.show();

    } else if (window.bootstrap) {

        const tabInstance = new bootstrap.Tab(tabButton);
        tabInstance.show();
    }
}

activeTabFromHash();

window.addEventListener('hashchange', activeTabFromHash);