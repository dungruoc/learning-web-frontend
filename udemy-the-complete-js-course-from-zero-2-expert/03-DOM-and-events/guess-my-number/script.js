'use strict';

let secret = Math.trunc(Math.random() * 20) + 1;
let score = 10;
let highScore = 0;
document.querySelector('.label-score').textContent = score;
document.querySelector('.label-highscore').textContent = highScore;

document.querySelector('.check').addEventListener('click', function() {
    // console.log(document.querySelector('.guess').value);
    if (score <= 0) {
        document.querySelector('.message').textContent = "Game over!";
        return;
    }
    const guess = Number(document.querySelector('.guess').value);
    if (!guess) {
        document.querySelector('.message').textContent = "No number!";
    } else if (guess === secret) {
        document.querySelector('.message').textContent = "Correct Number!!!";
        document.querySelector('.number').textContent = secret;
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('body').style.backgroundColor = 'green';

        if (score > highScore) {
            highScore = score;
        }
    } else if (guess > secret) {
        document.querySelector('.message').textContent = "Too big...!!!";
        score--;
    } else if (guess < secret) {
        document.querySelector('.message').textContent = "Too small...!!!";
        score--;
    } else {
        document.querySelector('.message').textContent = "Continue...!!!";
    }

    document.querySelector('.label-score').textContent = score;
    document.querySelector('.label-highscore').textContent = highScore;
})

document.querySelector('.again').addEventListener('click', function() {
    secret = Math.trunc(Math.random() * 20) + 1;
    score = 10;

    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('.message').textContent = "Start guessing...!!!";
    document.querySelector('.label-score').textContent = score;
    document.querySelector('.label-highscore').textContent = highScore;
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});