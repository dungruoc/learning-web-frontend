'use strict';

let hasDriverLicense = false;
const passTests = true;

// if (passTests) hasDriverLicenses = true;
if (passTests) hasDriverLicense = true;
if (hasDriverLicense) console.log('Can drive!');

function dummy_func() {
    console.log("Dummy log");
}

dummy_func();

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);

    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;
}

const fruitJuice = fruitProcessor(5, 1);
console.log(fruitJuice);


const calcAge = function (birthYear) {
    return 2026 - birthYear;
}

const age = calcAge(2000);
console.log(age);


const calcAge2 = birthYear => 2026 - birthYear;
console.log(calcAge2(2000));

const yearsUntilRetirement = (name, birthYear) => {
    const age = 2026 - birthYear;
    const retirement = 65 - age;
    return `${name} retires in ${retirement} years.`;
}

console.log(yearsUntilRetirement('John', 1970))


const friends = ['Mike', 'John', 'Peter'];
console.log(friends);

const years = new Array(1991, 1984, 2000);

years[2] = 2001; // non-primitive type is not immutable even with const keyword, only that years cannot be assigned to another value
console.log(years);

const john = {
    firstName: 'John',
    lastName: 'Smith',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Peter', 'Steven', 'Michael'],

    calcAge: (birthYear) => {
        return 2026 - birthYear;
    },

    // Arrow function cannot be used here to refer to this
    myAge: function() {
        return this.calcAge(this.birthYear);
    }
}

console.log(john);
console.log(john.firstName);

const nameKey = 'Name';
console.log(john['first' + nameKey]);
console.log(john['last' + nameKey]);

console.log(john.calcAge(john.birthYear));
console.log(john.myAge());


for (let i = 0; i < 10; i++) {
    console.log(`Loop at ${i}`);
}

// container loop
// const years = [2000, 2003, 2004, 2007];
for (const year of years) {
    console.log(`year ${year}`)
}

console.log("Test Node");
