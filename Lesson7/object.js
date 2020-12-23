/**
 * Напишите код, выполнив задание из каждого пункта отдельной строкой:

    1.  Создайте пустой объект user.
    2.  Добавьте свойство name со значением Alexander.
    3.  Добавьте свойство group со значением fe0212.
    4.  Измените значение свойства name на Ilya.
    5.  Удалите свойство name из объекта.
    6.  Создайте копию обьекта user.
    7.  Проверьте, что созданный обьект не пустой.
    8.  Узнайте количество свойств в нем.
    9.  Измените в копии свойство name на Ivan.
    10. Сравните свойства этих двух обьектов и придумайте структуру данных для отображения их разницы.
*/

// const user = new Object();
let pName = 'property name';
const user = {
    group: 'fe0212',
    name: 'Alexander',
    112: 112,
    'property name': 'property value',
    [pName]: 'property value 2'
};

user[pName] = 'property value';

pName = 112;

console.log(user[pName]); // 112

// user.name = 'Alexander';
// user['group'] = 'fe0212';
// user[112] = 112;

user[8] = null;

console.log(user);

// delete user[112];
// delete user[8];
// delete user[pName];

console.log(user);

function cloneObj(obj) {
    const result = {};

    for (const key in obj) {
        result[key] = obj[key];
    }

    return result;
}

const user2 = cloneObj(user);

user2.name = 'Ilya';

console.log(user2);
console.log(user);

const { name } = user2;
const { name: userName, ...rest } = user2;
const user3 = { ...user };

user3.name = 'Andrey';

console.log(userName);
console.log(rest);
console.log( user3 );
console.log( user );

function objectDif(obj1, obj2) {
    const result = {};

    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
            result[key] = false;
        }
    }

    for (const key in obj2) {
        // result[key] = obj1[key] === obj2[key];
        if (obj1[key] !== obj2[key]) {
            result[key] = false;
        }
    }

    return result;
}

console.log( objectDif(user, user3) ); // { name: true, group: false }
