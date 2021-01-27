function make_lazy(fn, ...args) {
    // const fn = arguments[0];
    // const args = Array.prototype.slice.call(arguments, 1);

    return function () {
        return fn.apply(this, args);
    };
}

function add(a, b) {
    return a + b;
}

const lazy_add = make_lazy(add, 2, 3); // LE = { fn, args }

console.log(typeof lazy_add === 'function');
console.log(lazy_add() === 5);

function mult(a, b, c) {
    return a * b * c;
}

const lazy_mult = make_lazy(mult, 1, 2, 3);

console.log(typeof lazy_mult === 'function');
console.log(lazy_mult() === 1 * 2 * 3);

console.log( make_lazy((a, b, c) => a * b / c, 6, 1, 2)() === 6 / 2 );
