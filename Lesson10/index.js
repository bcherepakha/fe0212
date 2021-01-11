// var + Function Delclaration
// LE = { userName: 'Kirill', [[SCOPE]]: window }
let userName = 'Anna';

console.log(userName);

sayHi(); // LE1 = { [[Scope]]: LE } => 'Anna'

function sayHi() {
    console.log(userName);
}

userName = 'Vasya';

sayHi(); // LE2 = { [[Scope]]: LE } => 'Vasya'

function makeShooter() {
    let userName = 'Shooter';

    function shooterSayHi() {
        console.log(userName);
    }

    function sayBy() {
        console.log('By', userName);
    }

    return { sayHi: shooterSayHi };
}

userName = 'Kirill';

const shooter = makeShooter(); // LE3 = { userName: 'Shooter', shooterSayHi , [[Scope]]: LE }

shooter.sayHi(); // LE4 = { [[Scope]]: LE3 } => 'Shooter'

function User(name) {
    this.sayHi = function() {
        console.log(name);
    };

    this.changeName = function(newName) {
        name = newName;
    };
}

const userJohn = new User('John'); // LE5 = { name: 'John 2', this: { sayHi }, arguments }

userJohn.sayHi();
userJohn.changeName('John 2');
userJohn.sayHi(); // 'John 2'

function makeCounter() {
    let count = 0;

    function step() {
        return ++count;
    }

    step.setCounter = function(newCountValue) {
        count = newCountValue;
    };

    return step;
}

const counter1 = makeCounter(); // LE6 = { count: 101, f }
const counter2 = makeCounter(); // LE7 = { count: 0, f }

console.log('counter1', counter1());
console.log('counter1', counter1());
console.log('counter1', counter1()); // LE8 = { [[Link]]: LE6 } => 2
console.log('counter2', counter2());
console.log('counter2', counter2());
console.log('counter1', counter1());
console.log('counter2', counter2());

counter1.setCounter(100);
console.log('counter1', counter1()); // 101

const lib1 = (function () {
    let a = 8;
    let b = 2;

    const exports = {
        sum: function() {
            return a + b;
        }
    };

    return exports;
})();   // LE = { a: 8 }

const lib2 = (function () {
    let a = 8;

    const exports = {
        mult: function(b) {
            return a * b;
        }
    };

    return exports;
})();   // LE = { a: 8 }

lib2.mult(2); // 16
