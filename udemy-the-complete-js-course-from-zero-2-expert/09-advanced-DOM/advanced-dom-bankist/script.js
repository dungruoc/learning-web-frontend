'use strict';

const eltModal = document.querySelector('.modal');
const eltOverlay = document.querySelector('.overlay');
const btnsShowModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

// Scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');

// Tabbed Components
const operationTabs = document.querySelectorAll('.operations__tab');
const operationTabContainer = document.querySelector('.operations__tab-container');
const operationTabContents = document.querySelectorAll('.operations__content');

const navBar = document.querySelector('.nav');
const headerContainer = document.querySelector('.header__title');

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
});

// document.querySelectorAll('.nav__link').forEach(
//     (el) => el.addEventListener('click', function(e) {
//         e.preventDefault();
//         const href = this.getAttribute('href');
//         document.querySelector(href).scrollIntoView({behavior: 'smooth'});
//     })
// );

// Instead of adding 1 event handler to each element: 3 handlers
// Better to delegate to the parrent
document.querySelector('.nav__links').addEventListener('click', function(e) {
    if (e.target.classList.contains('nav__link')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        document.querySelector(href).scrollIntoView({behavior: 'smooth'});
    }
});

// Tabs
operationTabContainer.addEventListener('click', function(e) {
    const clickTab = e.target.closest('.operations__tab');
    if (clickTab) {
        e.preventDefault();
        clickTab.classList.add('operations__tab--active');
        operationTabs.forEach((el) => {
            if (el !== clickTab) el.classList.remove('operations__tab--active')
        });

        const tabContent = document.querySelector(`.operations__content--${clickTab.getAttribute('data-tab')}`);
        tabContent.classList.add('operations__content--active');
        operationTabContents.forEach((content) => {
            if (content !== tabContent) content.classList.remove('operations__content--active');
        });
    }
});

const shadowSiblings = function(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const closestNav = link.closest('.nav');
        const siblings = closestNav.querySelectorAll('.nav__link');
        const logo = closestNav.querySelector('img');
        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo && (logo.style.opacity = this);
    }
}

navBar.addEventListener('mouseover', shadowSiblings.bind(0.5));
navBar.addEventListener('mouseout', shadowSiblings.bind(1));

// Sticky Nav bar
// this scroll event handler works, but with bad performance as it's trigger for every scrolling move
// window.addEventListener('scroll', function(e) {
//     if (Number(sectionOne.getBoundingClientRect().y) <= 0) {
//         navBar.classList.add('sticky');
//     } else {
//         navBar.classList.remove('sticky');
//     }
// });

const obsCallback = function(entries, observer) {
    const [ent] = entries; // destructuring the first element of array
    if (ent.isIntersecting)
        navBar.classList.remove('sticky');
    else
        navBar.classList.add('sticky');
};

const headerOpserver = new IntersectionObserver(obsCallback, {
    root: null, // the viewport
    threshold: 0.1
});
headerOpserver.observe(headerContainer);