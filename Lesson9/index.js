'use strict';

// 1. Initialize var, function declaration
// global.pow = function() { ... }
// global.a = undefined

// 2. Execute

// console.log( pow(3, 4) ); // 3 ** 4 = 81
// console.log( sum );

const sum = function (a , b = 0, ...rest) {
    console.log(this, arguments, { a , b, rest });
    return a + b;
}  // function expresion

// function pow(x, n) {
//     console.log(this, arguments); // this = undefined, arguments = { 0: 2, 1: 4, length: 2 }
//     let result = 1;

//     for (let i=1; i <=n; i++) {
//         result *= x;
//     }

//     return result;
// }

function pow(x, n) {
    console.log(this, arguments); // this = undefined, arguments = { 0: 2, 1: 4, length: 2 }

    if (n === 1) {
        return x;
    }

    return x * pow(x, n - 1);
}

// console.log( pow(2, 4) ); // 2* (2* (2 * (2 ** 1))) = 16
// console.log( sum(3, 5) ); // 8

// const sum35 = sum(3, 4, 5, 6, 7, 8, 9);

const a = {
    name: 'a',
    b: {
        name: 'b',
        sum,
        pow
    },
    sum,
    pow
};

// console.log( a );
// a.sum(3, 5);
// a.b.sum(7, 8);

// sum.call(true, 3, 5, 6, 7, 8, 9);
// sum.apply('context', [3, 5, 6, 7, 8, 9]);

// pow(3, 4);

console.dir(sum);
console.dir(pow);
console.dir(function (a, b, c = 0) { return a + b + c; })

const arr = [3, 5, 8, 2, 23, 12];

function arrMaximum( arr ) {
    let currentMax = arr[0];

    for (let i=1; i < arr.length; i++) {
        if (arr[i] > currentMax) {
            currentMax = arr[i];
        }
    }

    return currentMax;
}

// console.log( arrMaximum( arr ) );
// console.log( Math.max(...arr) ); // this = Math
// console.log( Math.max.apply(Math, arr) );
// console.log( Math.max.call(Math, ...arr) );

// pow.call({ name: 'context' }, 3, 4);

function calc(a, b, action) {
    console.log('calc', this, arguments);
    return action.apply(this, [a, b]);
}

calc.call('context', 3, 4, sum); // 7
calc.call('context', 3, 4, pow); // 81
