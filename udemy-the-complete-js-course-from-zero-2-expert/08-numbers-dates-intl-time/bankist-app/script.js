'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const MIN_INTEREST_PAID = 1;

const accounts = [account1, account2];

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
const containerBalanceDate = document.querySelector('.balance__date_date');
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

const buildMovHtml = function(account, mov, index) {
    const movType = mov.value > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${movType}">
                ${index + 1} ${movType}
            </div>
            <div class="movements__date">${formatLocaleDate(mov.date, account.locale)}</div>
            <div class="movements__value">${formatCurrency(account, mov.value)}</div>
        </div>`;
    return html;
};

const displayMovements = function(account) {
    let movements = account.movements.map((mov, i) => ({value: mov, date: new Date(account.movementsDates[i])}));
    movements = sorted ? movements.toSorted((a, b) => a.value - b.value) : movements;
    containerMovements.innerHTML = '';
    movements.forEach(function(movement, i) {
        const html = buildMovHtml(account, movement, i);
        containerMovements.insertAdjacentHTML('afterbegin', html);
    })
};

const formatLocaleDate = function(date, locale) {
    return Intl.DateTimeFormat(locale).format(date);
}

const displayBalance = function(account) {
    account.balance = account.movements.reduce((acc, mov) => (acc + mov), 0);
    containerBalanceValue.textContent = formatCurrency(account, account.balance);
    containerBalanceDate.textContent = formatLocaleDate(Date.now(), account.locale);
}

const displaySummaryValues = function(account) {
    containerSummaryValueIn.textContent = formatCurrency(account, account.movements.
        filter((move) => move > 0).
        reduce((acc, move) => acc + move, 0));

    containerSummaryValueOut.textContent = formatCurrency(account, account.movements.
        filter((mov) => mov < 0).
        reduce((acc, mov) => acc + mov, 0));

    containerSummaryValueInterest.textContent = formatCurrency(account, account.movements.
        filter((mov) => mov > 0).
        map((mov) => mov * account.interestRate / 100).
        filter((interest) => interest >= MIN_INTEREST_PAID).
        reduce((acc, mov) => acc + mov, 0));
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

const formatCurrency = function(account, amount) {
    return Intl.NumberFormat(account.locale, {
        style: 'currency',
        currency: account.currency
    }).format(amount);
}

const updateAccountUI = function(account) {
    displayMovements(account);
    displayBalance(account);
    displaySummaryValues(account);
}

btnSort.addEventListener('click', function(e) {
    sorted = !sorted;
    displayMovements(loggedInAcc);
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
