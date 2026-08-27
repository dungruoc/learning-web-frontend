'use strict';

const Person = function(firstName, birthYear) {
    console.log(this);
    this.firstName = firstName;
    this.birthYear = birthYear;

    // This is not good as each instance
    // carries a copy of this method -> DO NOT do this
    this.calcAge = function() {
        return 2026 - this.birthYear;
    }
}

Person.prototype.betterCalcAge = function() {
    return new Date().getFullYear() - this.birthYear;
}

const john = new Person('John', 1970);
const jack = new Person('Jack', 1990);

console.log(john);
console.log(jack);
console.log(Person.prototype);
console.log(john.calcAge());
console.log(jack.betterCalcAge());

console.log(john.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jack));

const aFunction = function(something) {
    console.log(`Saying ${something}`);
}

// Any function has a prototype object
console.log(aFunction.prototype);

console.log(john.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 3, 1, 2, 4, 5, 3];
console.log(arr.__proto__);

// Do not use this, just to test the ability
Array.prototype.unique = function() {
    return [...(new Set(this))];
}

console.log(arr.unique());

// CHALLENGE 1

const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function() {
    this.speed += 10;
}

Car.prototype.brake = function() {
    this.speed -= 5;
}

const bmw = new Car('BMW', 120);
console.log(bmw);
bmw.accelerate();
console.log(bmw);
bmw.brake();
console.log(bmw);

const mercedes = new Car('Mercedes', 95);


class PersonCl {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    // method will be added to .prototype property
    calcAge() {
        return 2026 - this.birthYear;
    }

    get age() {
        return this.calcAge();
    }


}

const jessica = new PersonCl('Jessica', 2000);
console.log(jessica);
console.log(jessica.calcAge());

console.log(jessica.__proto__ === PersonCl.prototype);
console.log(jessica.__proto__);
console.log(jessica.__proto__.__proto__);

PersonCl.prototype.greet = function() {
    console.log(`Hello from ${this.firstName}`);
}

jessica.greet();

const PersonProto = {
    calcAge: function() {
        return 2026 - this.birthYear;
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const steven = Object.create(PersonProto);
steven.init('Steven', 2001);
console.log(steven);
// steven.birthYear = 2001;
console.log(steven.calcAge());
console.log(steven.__proto__ === PersonProto);


class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
    }

    brake() {
        this.speed -= 5;
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(mph) {
        this.speed = mph * 1.6;
    }
}

const ford = new CarCl('Ford', 120);
console.log(ford);
console.log(ford.speedUS);
ford.accelerate();
console.log(ford.speedUS);
ford.speedUS = 100;
console.log(ford);

// Inheritance
const Student = function(firstName, birthYear, course) {
    // Person.call(this, firstName, birthYear);
    Person.bind(this)(firstName, birthYear);
    this.course = course;
}

// Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

console.log(Student.prototype.__proto__);
Student.prototype.__proto__ = Person.prototype;
console.log(Student.prototype.__proto__);

const mike = new Student('Mike', 2003, 'CS');
mike.introduce();
console.log(mike.betterCalcAge());

class StudentCl extends PersonCl {
    constructor(firstName, birthYear, course) {
        super(firstName, birthYear);
        this.course = course;
    }

    introduce() {
        console.log(`Hi, I am ${this.firstName}, I study ${this.course}`);
    }
}

const anna = new StudentCl('Anna', 2005, 'Physics');
console.log(anna.age);
anna.introduce();

console.log(anna);
console.log(anna.__proto__);

// Object create

const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firtName, birthYear, course) {
    PersonProto.init.call(this, firtName, birthYear);
    this.course = course;
}
StudentProto.introduce = function() {
    console.log(`Hi, I am ${this.firstName}, I study ${this.course}`);
}

const jay = Object.create(StudentProto);
jay.init('Jay', 2008, 'Economy');

console.log(jay.calcAge());
console.log(jay.__proto__);
jay.introduce();

class Account {
    locale = navigator.language;

    // private fields
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
    }

    deposit(val) {
        this.#movements.push(val);
    }

    withdraw(val) {
        this.deposit(-val);
    }

    // private
    #approveLoan(val) {
        return true;
    }

    requestLoan(val) {
        if (this.#approveLoan(val)) {
            this.deposit(val);
        }
    }
}

const account1 = new Account('Jonas', 'EUR', 1111);
account1.deposit(100);
console.log(account1);

const account2 = new Account('Jack', 'USD', 2222);
account2.withdraw(50);
console.log(account2);