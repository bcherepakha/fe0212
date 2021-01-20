const keyName = 'apple';
const age = 30;

const user = {
    name: 'Peter',
    age,    // age: 30
    [keyName]: 5, // apple: 5
    __proto__: {
        group: 'fe0212'
    },
    _value: 5,
    get value() {
        return this._value;
    },
    set value(newValue) {
        this._value = newValue;
    }
};

// Object.defineProperty(user, 'value', { writable: false, value: 8 });
// user.value = 6;

Object.defineProperty(user, '_value', {
    enumerable: false
});
// Object.defineProperty(user, 'value', {
//     get: function() {
//         // console.log(this);
//         return this._value;
//     },
//     set: function(newValue) {
//         // console.log(this);
//         this._value = newValue;
//     }
// });

console.log(user.value);

user.value = 9;
console.log(user.value);
