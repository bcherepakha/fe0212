'use strict';

function makeShooters(shootersNumber) {
    const shooters = [];

    for (let i=0; i<shootersNumber; i++ ) {
        // LEI0 = { i: 0, shooter0 }
        // LEI1 = { i: 1, shooter1 }
        // LEI2 = { i: 2, shooter2 }
        const shooter = function () {
            console.log(i);
        };

        shooters.push(shooter);
    }

    return shooters;
}

const shooters = makeShooters(10); // LE1 = { shooters: [ shooter0, shooter1, shooter2 ] }

shooters[2](); // 2

const data = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};

for (const key in data) {
    // LEK0 : { key: a }
    // LEK1 : { key: b }
    console.log(key);
}

function sum(a) {
    return function (b) {
        return a + b;
    };
}

sum(2)(3);

function mult() {
    return Array.prototype.reduce.apply(
        arguments,
        [function(result, el) {
            return result * el;
        },
        1]
    );
}

mult(2, 3);

const doubleMult = mult.bind(null, 2);

doubleMult(3); // 6
doubleMult(4, 2); // 16

const users = [
    { name: 'John', age: 10 + Math.ceil(Math.random() * 40), rating: Math.ceil(Math.random() * 40) },
    { name: 'Anna', age: 15 + Math.ceil(Math.random() * 33), rating: Math.ceil(Math.random() * 55) },
    { name: 'Kirill', age: 10 + Math.ceil(Math.random() * 60), rating: Math.ceil(Math.random() * 99) }
];

function sortBy(fieldName, direction) {
    return function(el1, el2) {
        if (direction === 'ASK') {
            return el2[fieldName] - el1[fieldName];
        }

        return el1[fieldName] - el2[fieldName];
    };
}

console.log([...users]);
users.sort(sortBy('age', 'ASK'));
console.log([...users]);
users.sort(sortBy('rating', 'DESK'));
console.log([...users]);
