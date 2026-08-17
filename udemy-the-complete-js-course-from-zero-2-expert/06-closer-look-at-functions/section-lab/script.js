'use strict';

const bookings = [];

const createBooking = function(
    flightNum,
    numPassengers = 1,
    price = 199 * numPassengers
) {
    // old fashion to take default value
    // numPassengers = numPassengers || 1;
    // price = price || 199;

    const booking = {
        flightNum,
        numPassengers,
        price
    };

    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2);


const decorated = function(func) {
    return function() {
        console.log(`Starting ${func.name} ==>`);
        func();
        console.log(`=> Ending ${func.name}`)
    }
}

const decoratedHi = decorated(function() {
    console.log('hello');
});

decoratedHi();


// Closure

const boardPassengers = function(n, wait_seconds) {
    const nGroups = n / 3;

    setTimeout(function() {
        console.log(`Now boarding ${n} passengers, in 3 groups, each of ${nGroups}`);
    }, wait_seconds * 1000);

    console.log(`Will start boarding ${n} passengers in 3 groups`);
}

boardPassengers(201, 3);

(function() {
    const heading = document.querySelector('h1');
    heading.style.color = 'red';

    heading.addEventListener('click', function() {
        heading.style.color = 'blue';
    });
})();