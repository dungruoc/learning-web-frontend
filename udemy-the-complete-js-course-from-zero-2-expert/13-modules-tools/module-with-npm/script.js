// 'use strict';
console.log('Importing Module');

import cloneDeep from 'lodash-es';

const state = {
    cart: [
        { product: 'bread', quantity: 5 },
        { product: 'pizza', quantity: 5}
    ],
    user: { loggedIn: true }
};

const clonedState = cloneDeep(state);
state.user.loggedIn = false;

console.log(clonedState);


import * as ShopingCart from './shoppingCart.js';

ShopingCart.addToCart('bread', 5);
ShopingCart.addToCart('milk', 3);


console.log(ShopingCart.totalQuantity());

class Person {
    #greeting = 'Hey';

    constructor(name) {
        this.name = name;
        console.log(`${this.#greeting}, I am ${this.name}`);
    }
}

const john = new Person('John');
console.log(john);

if (module.hot) {
    module.hot.accept();
}

console.log(state.cart.find(el => el.quantity === 5));