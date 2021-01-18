const keyName = 'apple';
const age = 30;

const user = {
    name: 'Peter',
    age,    // age: 30
    [keyName]: 5, // apple: 5
    __proto__: {
        group: 'fe0212'
    }
};
