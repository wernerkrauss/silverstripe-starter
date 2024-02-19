import Swiper, {Autoplay, Navigation} from 'swiper';
import GLightbox from "glightbox";

document.addEventListener("DOMContentLoaded", function (event) {

    //Lightbox
    const lightbox = GLightbox({
        selector: '[data-gallery]',
        touchNavigation: true,
        loop: true,
    });

    // init Swiper:
    const swiperElements = document.querySelectorAll('.swiper');
    swiperElements.forEach(swiperElement => {
        const nextEl = swiperElement.querySelector('.swiper-button-next');
        const prevEl = swiperElement.querySelector('.swiper-button-prev');
        const swiper = new Swiper(swiperElement, {
            // configure Swiper to use modules
            modules: [Navigation],
            direction: 'horizontal',
            loop: false,

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            // Navigation arrows
            navigation: {
                nextEl,
                prevEl,
            },
        });
    })

    const autoSwiperElements = document.querySelectorAll('.autoswiper');
    autoSwiperElements.forEach(autoSwiperElement => {
        const autoSwiper = new Swiper(autoSwiperElement, {
            // configure Swiper to use modules
            modules: [Autoplay],
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            // direction: 'horizontal',
            loop: true,
            autoplay: {
                delay: 5000,
            },
            speed: 1000,

        });
    })

    // Static Navigation
    const staticNav = document.querySelector('header');
    const staticNavHeight = staticNav.offsetHeight;
    var lastScrollHeight = 0;

    window.addEventListener('scroll', function (event) {
        // console.log("Scrolling...");
        if (window.scrollY > staticNavHeight) {
            // console.log("should hide");
            if (lastScrollHeight > window.scrollY && window.scrollY > staticNavHeight * 2) {
                staticNav.classList.remove('hide');
                lastScrollHeight = window.scrollY;
            } else {
                staticNav.classList.add('hide');
                lastScrollHeight = window.scrollY;
            }
        } else {
            if (window.scrollY < lastScrollHeight - staticNavHeight) {
                staticNav.classList.remove('hide');
                lastScrollHeight = window.scrollY;
            }

        }
    });
});
