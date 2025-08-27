const swiper1 = new Swiper( '.main-slider', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    speed: 500,
    slidesPerView: 1,
    centeredSlides: true,
    navigaton: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});

const swiper2 = new Swiper( '.popular-news', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    speed: 500,
    slidesPerView: 1,
    centeredSlides: true,
    navigation: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});

const swiper3 = new Swiper( '.latest-news', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    speed: 500,
    slidesPerView: 1,
    centeredSlides: true,
    navigation: true,
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