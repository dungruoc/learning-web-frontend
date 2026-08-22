'use strict';

console.log(document.documentElement);
console.log(document.documentElement.childNodes[0]);
console.log(document.head);
console.log(document.head === document.documentElement.childNodes[0]);

console.log(document.querySelector('.header'));
console.log(document.querySelectorAll('.section'));

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

// Creation

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied message';
message.innerHTML = 'We use cookied for improved functionality and analytics, <button class="btn btn--close-cookie">Got it!</button>"';
document.querySelector('.header').prepend(message);
document.querySelector('.header').append(message);
const cloneMessage = message.cloneNode(true);
document.querySelector('.header').before(cloneMessage);

document.querySelectorAll('.btn--close-cookie').forEach(
    btn => btn.addEventListener('click', function(e) {
    message.remove();
    cloneMessage.remove();
    })
);

message.style.backgroundColor = '#37383d';
message.style.width = '120%'; // inline style
console.log(message.style.color); // this will not work as color is not in the inline style
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty('--color-primary', 'orangered');

// standard attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src);

// non-standard attributes
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

const h1 = document.querySelector('h1');

const h1Alert = function(e) {
    alert("your are reading a heading");
    h1.removeEventListener('mouseenter', h1Alert);
};

h1.addEventListener('mouseenter', h1Alert); // this will trigger only once

h1.onmouseenter = function(e) {
    alert("onmouseenter: your are reading a heading");
}


const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function(e) {
    console.log('.nav__link', e.target, e.currentTarget);
    this.style.backgroundColor = randomColor();
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
    console.log('.nav__links', e.target, e.currentTarget);
    this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function(e) {
    console.log('.nav', e.target, e.currentTarget);
    this.style.backgroundColor = randomColor();
}, true); // capturing time, not bubbling


// DOM traversing down-ward to children
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';

// up-ward to parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// closest element from the element to parents until found
h1.closest('.header').style.background = 'var(--gradient-primary)';

// side-ward
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach((el) => {
    if (el !== h1) el.style.transform = 'scale(0.5';
});