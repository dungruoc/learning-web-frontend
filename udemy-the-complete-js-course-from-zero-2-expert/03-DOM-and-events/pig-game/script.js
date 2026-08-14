'use strict';

const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const playerOneScore = document.querySelector('#score--0');
const playerTwoScore = document.querySelector('#score--1');
const playerOneCurrentScore = document.querySelector('#current--0');
const playerTwoCurrentScore = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
let currentPlayer = playerOne;
const MAX_SCORE = 40;

const newGame = function() {
    playerOne.classList.remove('player--winner');
    playerTwo.classList.remove('player--winner');
    playerOneScore.textContent = 0;
    playerOneCurrentScore.textContent = 0;
    playerTwoScore.textContent = 0;
    playerTwoCurrentScore.textContent = 0;
    dice.classList.add('hidden');
    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');
    switchPlayer(playerOne);
}

btnNew.addEventListener('click', newGame);

const rollDice = function() {
    return Math.trunc(Math.random()*6) + 1;
} 

const showDice = function(value) {
    dice.src = `dice-${value}.png`;
    dice.classList.remove('hidden');
}

const switchPlayer = function(player) {
    let otherPlayer = player;
    if (player) {
        currentPlayer = player;
        otherPlayer = (player === playerOne) ? playerTwo : playerOne;
    } else {
        otherPlayer = currentPlayer;
        currentPlayer = (otherPlayer === playerOne) ? playerTwo : playerOne;
    }
    otherPlayer.classList.remove('player--active');
    currentPlayer.classList.add('player--active');
    currentPlayerCurrentScore().textContent = 0;
}

const currentPlayerScore = function() {
    if (currentPlayer === playerOne) {
        return playerOneScore;
    } else {
        return playerTwoScore;
    }
}


const currentPlayerCurrentScore = function() {
    if (currentPlayer === playerOne) {
        return playerOneCurrentScore;
    } else {
        return playerTwoCurrentScore;
    }
}

btnRoll.addEventListener('click', function() {
    const rolled = rollDice();
    showDice(rolled);
    if (rolled === 1) {
        switchPlayer();
    } else {
        const playerCurrentScore = currentPlayerCurrentScore();
        playerCurrentScore.textContent = Number(playerCurrentScore.textContent) + rolled;
    }
});

btnHold.addEventListener('click', function() {
    const currentScore = currentPlayerScore();
    const newScore = Number(currentScore.textContent) + Number(currentPlayerCurrentScore().textContent);
    currentScore.textContent = newScore;
    if (newScore >= MAX_SCORE) {
        currentPlayer.classList.remove('player--active');
        currentPlayer.classList.add('player--winner');
        btnRoll.classList.add('hidden');
        btnHold.classList.add('hidden');
    }

    switchPlayer();
})

newGame();