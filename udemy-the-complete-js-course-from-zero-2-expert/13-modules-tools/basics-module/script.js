'use strict';
console.log('Importing Module');

// import { addToCart, totalQuantity } from './shoppingCart.js';
import * as ShopingCart from './shoppingCart.js';

// addToCart('bread', 5);
// addToCart('milk', 3);

ShopingCart.addToCart('bread', 5);
ShopingCart.addToCart('milk', 3);


console.log(ShopingCart.totalQuantity());

// top level await (with Module only)
console.log('Start fetching');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);
console.log('Fetched');
// The above await runs in the module, so the module run in blocking mode

// It is not the same as running async function that uses
// Microtask queue
const getLastPost = async function() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    const last = data.at(-1);
    console.log(last);
    return last;
}

console.log('Getting last post');
getLastPost(); // this one is run in async, returns just a Promise
console.log('Async run');

import { ShoppingCart2 } from './shoppingCart2.js';

ShoppingCart2.addToCart('beer', 2);
ShoppingCart2.addToCart('wine', 1);
console.log(ShoppingCart2.totalQuantity());