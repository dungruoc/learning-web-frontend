'use strict';

const containerHeader = document.querySelector('.header');
const btnMobileNav = document.querySelector('.btn-mobile-nav');

btnMobileNav.addEventListener('click', function(e) {
    containerHeader.classList.toggle('nav-open');
});


