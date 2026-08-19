'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const MIN_INTEREST_PAID = 1;

const accounts = [account1, account2, account3, account4];

let loggedInAcc;

// Login
const btnLogin = document.querySelector('.login__btn');
const loginInputUser = document.querySelector('.login__input--user');
const loginInputPin = document.querySelector('.login__input--pin');
// logout
const btnClose = document.querySelector('.form__btn--close');
const closeInputUser = document.querySelector('.form__input--user');
const closeInputPin = document.querySelector('.form__input--pin');

// Account
const containerWelcome = document.querySelector('.welcome');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const containerBalanceValue = document.querySelector('.balance__value');
const btnSort = document.querySelector('.btn--sort');
let sorted = false;
// Summary
const containerSummaryValueIn = document.querySelector('.summary__value--in');
const containerSummaryValueOut = document.querySelector('.summary__value--out');
const containerSummaryValueInterest = document.querySelector('.summary__value--interest');

// transfer
const transferInputTo = document.querySelector('.form__input--to');
const transferInputAmount = document.querySelector('.form__input--amount');
const btnTransfer = document.querySelector('.form__btn--transfer');

// loan
const btnLoan = document.querySelector('.form__btn--loan');
const loanInputAmount = document.querySelector('.form__input--loan-amount');

const buildMovHtml = function(mov, index) {
    const movType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${movType}">
                ${index + 1} ${movType}
            </div>
            <div class="movements__value">${mov}</div>
        </div>`;
    return html;
};

const displayMovements = function(movements) {
    containerMovements.innerHTML = '';

    movements.forEach(function(movement, i) {
        const html = buildMovHtml(movement, i);
        containerMovements.insertAdjacentHTML('afterbegin', html);
    })
};

const displayBalance = function(account) {
    account.balance = account.movements.reduce((acc, mov) => (acc + mov), 0);
    containerBalanceValue.textContent = account.balance;
}

const displaySummaryValues = function(account) {
    containerSummaryValueIn.textContent = account.movements.
        filter((move) => move > 0).
        reduce((acc, move) => acc + move, 0);

    containerSummaryValueOut.textContent = account.movements.
        filter((mov) => mov < 0).
        reduce((acc, mov) => acc + mov, 0);

    containerSummaryValueInterest.textContent = account.movements.
        filter((mov) => mov > 0).
        map((mov) => mov * account.interestRate / 100).
        filter((interest) => interest >= MIN_INTEREST_PAID).
        reduce((acc, mov) => acc + mov, 0);
}

const createUsernames = function(accounts) {
    const createUsername = function(fullname) {
        return fullname.toLocaleLowerCase().split(' ').map((word) => word.at(0)).join('');
    }

    accounts.forEach((acc) => {
        acc.username = createUsername(acc.owner)
    });
}

btnLogin.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('LOGIN', loginInputUser.value);
    // const username = ;
    loggedInAcc = accounts.find((acc) => (acc.username === loginInputUser.value) &&
         (acc.pin === Number(loginInputPin.value)));
    loginInputUser.value = loginInputPin.value = '';
    loginInputUser.disabled = loginInputPin.disabled = true;
    sorted = false;
    console.log(loggedInAcc);
    displayAccount();
});

btnClose.addEventListener('click', function(e) {
    e.preventDefault();
    if (closeInputUser.value === loggedInAcc.username &&
        Number(closeInputPin.value) === loggedInAcc.pin) {
            loggedInAcc = undefined;
            loginInputUser.value = loginInputPin.value = '';
            loginInputUser.disabled = loginInputPin.disabled = false;
            containerApp.style.opacity = 0;
            containerWelcome.textContent = 'Log in to get started';
        }
});

const displayAccount = function() {
    if (loggedInAcc) {
        containerWelcome.textContent = `Welcome back, ${loggedInAcc.owner.split(' ').at(0)}!`;
        containerApp.style.opacity = 100;
        closeInputUser.value = closeInputPin.value = '';
        updateAccountUI(loggedInAcc);
    }
}

const updateAccountUI = function(account) {
    displayMovements(sorted ? account.movements.sort() : account.movements);
    displayBalance(account);
    displaySummaryValues(account);
}

btnSort.addEventListener('click', function(e) {
    sorted = !sorted;
    displayMovements(sorted ? loggedInAcc.movements.toSorted((a, b) => a - b) : loggedInAcc.movements);
});

btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();
    const recvAccount = accounts.find((acc) => acc.username === transferInputTo.value);
    const transferAmmount = Number(transferInputAmount.value);
    transferInputAmount.value = transferInputTo.value = '';
    console.log(`transfering ${transferAmmount} to ${recvAccount?.owner}`);

    if (recvAccount && recvAccount.username !== loggedInAcc.username &&
        transferAmmount > 0 && loggedInAcc.balance >= transferAmmount) {
        recvAccount.movements.push(transferAmmount);
        loggedInAcc.movements.push(- transferAmmount);

        updateAccountUI(loggedInAcc);
    }
});

btnLoan.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = Number(loanInputAmount.value);
    loanInputAmount.value = '';

    if (amount > 0 && loggedInAcc.
            movements.every((mov) => (mov < 0 || mov >= amount * 0.1))) {
        loggedInAcc.movements.push(amount);
        updateAccountUI(loggedInAcc);
    }
});


createUsernames(accounts);
// console.log(accounts);
