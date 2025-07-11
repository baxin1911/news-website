const base = 'https://ruinednews.com';
const urlGetNotices = base + '/api/notices';

const swiper = Swiper( '.main-swiper', {
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

const swiper2 = Swiper('.swiper-container', {
    loop: true,
    speed: 5000,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el:'.swiper-pagination',
        clickable: true
    },
    slidesPerView: 1,
    breakpoints: {
        0: {
            slidesPerView: 1
        }
    }
});

window.addEventListener('scroll', () => {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 100) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

document.querySelector('.back-to-top').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


//--------------------Show notice---------------------------
/*
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
} 

function encryptId(id, key) {
    return CryptoJS.AES.encrypt(id, key).toString();
}
function decryptId(encryptedId, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedId, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
const encryptionKey = 'raulxt914';

on(document, 'click', '.btnShowNotice', async e => {
    const id = e.target.id;
    const encryptedId = encryptId(id, encryptionKey);
    localStorage.setItem('oiokoykhot', encryptedId); //id notice
    window.location.href = 'notice';
});

/*
const encryptedId = localStorage.getItem('oiokoykhot');
if (encryptedId) {
    const decryptedId = decryptId(encryptedId, encryptionKey);
    console.log('ID desencriptado recuperado del localStorage:', decryptedId);
} else {
    console.log('No hay ID encriptado almacenado en localStorage');
}
*/

