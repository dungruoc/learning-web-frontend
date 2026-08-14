'use strict';

// this global scope is the Window
console.log('global this', this);

// undefined
let sayHello = function() {
    console.log('hello', this);
}
sayHello();

sayHello = () => {
    // this here is the parrent scope, so will be the Window
    console.log('arrow hello', this);
}
sayHello();

const john = {
    name: 'John',
    lastName: 'Smith',
    sayHi: function() {
        console.log(`hi! I'm ${this.name}`);
    },

    arrSayHi: () => {
        console.log('arrow hi:');
        console.log(this.lastName);
        console.log(this);
    }
}
john.sayHi(); // John

const jonas = {
    name: 'Jonas'
}

jonas.sayHi = john.sayHi;
jonas.sayHi(); // -> Jonas

document.getElementById('first-heading').addEventListener('click', function() {
    console.log(this);
});

john.arrSayHi();

const marry = {
    name: 'Marry',

    sayHello: function () {
        console.log(`hello from ${this}`);
        this.saySomthing();
        this.sayMore();
    },

    saySomthing: function() {
        console.log(`saying somthing from ${this}`);
    },

    sayMore: () => {
        console.log(`saying more from ${this}`);
    },
}

marry.sayHello();