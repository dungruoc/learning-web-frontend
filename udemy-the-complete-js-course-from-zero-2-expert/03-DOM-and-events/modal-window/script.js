'use strict';

const btnsOpenModel = document.querySelectorAll('.show-modal');
console.log(btnsOpenModel);
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

for (let btn of btnsOpenModel) {
    btn.addEventListener('click',  function() {
        console.log('button clicked');
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });
}

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const btnCloseModal = document.querySelector('.close-modal');
btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);
document.addEventListener('keypress', function(e) {
    console.log(e.key);
    if (e.key === 'q' && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }
});