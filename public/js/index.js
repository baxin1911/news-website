const swiper = new Swiper( '.popular-news', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    speed: 500,
    slidesPerView: 1,
    centeredSlides: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});

const backToTop = document.querySelector('.back-to-top');
backToTop.setAttribute('aria-hidden', 'true');

window.addEventListener('scroll', () => {

    if (window.scrollY > 150) {

        backToTop.setAttribute('aria-hidden', 'false');
        backToTop.classList.add('visible');

    } else {

        backToTop.setAttribute('aria-hidden', 'true');
        backToTop.classList.remove('visible');

    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});