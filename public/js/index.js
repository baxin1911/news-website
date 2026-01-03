import { showSuccessToast, showWarningToast } from "./utils/messages.js";
import { showModal } from "./utils/utils.js";

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
    const params = new URLSearchParams(window.location.search);

    if (params.has('loginError')) {

        showModal('loginModal');
        showWarningToast('Requiere inicio de sesión.');

    } else if (params.has('profileError')) {

        showWarningToast('Sesión no válida.');

    } else if (params.has('emailVerifyError') || params.has('resetError')) {

        showWarningToast('Sesión expirada.');

    } else if (params.has('verified')) {

        showSuccessToast('Correo verificado exitosamente.');
    }
});