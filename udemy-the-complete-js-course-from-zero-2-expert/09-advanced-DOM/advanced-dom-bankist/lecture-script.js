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
