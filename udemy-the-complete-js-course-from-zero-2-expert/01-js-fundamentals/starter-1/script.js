// let js = 'amazing';
// if (js === 'amazing') {
//     alert("Javascript is Fun");
// }

console.log(10 + 2 + 3);

let firstName = "John";
console.log(firstName);


const lastName = 'Smith';
// const firstName = 'John';
const fullName = lastName + ' ' + firstName;
console.log(fullName);

const birthYear = 2000;
const currentYear = 2026;
const job = 'software engineer';
const phrase = `I'm ${firstName}, a ${currentYear - birthYear}-year old ${job}`;
console.log(phrase);

const inputYear = '1990';
console.log(inputYear + 10); // -> '199010' as string concat
console.log(Number(inputYear) + 10); // -> 2000

let n = '1' + 1; // -> '11'
n = n - 1; // 11 - 1 = 10
console.log(n);

console.log('18' == 18); // -> true (with coercion)
console.log('18' === 18); // -> false (no coercion)

let age = 17;
const drink = age >= 18 ? 'wine' : 'water';
console.log(drink);
