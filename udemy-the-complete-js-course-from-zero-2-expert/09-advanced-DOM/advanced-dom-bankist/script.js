'use strict';

const eltModal = document.querySelector('.modal');
const eltOverlay = document.querySelector('.overlay');
const btnsShowModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

btnsShowModal.forEach((btn) => btn.addEventListener(
    'click', function(e) {
        e.preventDefault();
        eltModal.classList.remove('hidden');
        eltOverlay.classList.remove('hidden');
    }
));

btnCloseModal.addEventListener('click', function(e) {
    e.preventDefault();
    eltModal.classList.add('hidden');
    eltOverlay.classList.add('hidden');
})

const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function(e) {
    e.preventDefault();
    const coords = sectionOne.getBoundingClientRect();
    // console.log(coords);
    // window.scrollTo(coords.left + window.pageXOffset, coords.top + window.pageYOffset);
    // window.scrollTo({
    //     left: coords.left + window.pageXOffset,
    //     top: coords.top + window.pageYOffset,
    //     behavior: 'smooth'
    // });
    sectionOne.scrollIntoView({behavior: 'smooth'});
})