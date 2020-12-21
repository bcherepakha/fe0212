// 1. number
let a = 2;
let b = 3.5;
let maxInt = 9007199254740991; // 2^53 - 1
/* Infinity, NaN */

a = b + 4;

console.log(a);
console.log(2..toString()); // '2'
console.log(a.toString()); // '2'
console.log(String(a)); // '2'
console.log('' + a); // '2'
console.log(a + ''); // '2'

console.log(Boolean(a)); // true
console.log(Boolean(0)); // false
console.log(Boolean(-5)); // true
console.log(Boolean(NaN)); // false
console.log(Boolean(Infinity)); // true

console.log('!a', !a); // false
console.log('!!a', !!a); // true

// 2. bigint
let bigA = 19007199254740991n;

console.log(bigA.toString());
console.log('Boolean(bigA)', Boolean(bigA)); // true
console.log('!!bigA', !!bigA); // true
console.log('!!0n', !!0n); // false

// 3. string
let str1 = 'Hello, \'world!';
let str2 = "Hello, \"world!";
let userName = `Andrey`;
let str3 = `Hello, ${userName}`;

userName = `Bohdan`;

console.log(str3);
console.log(Boolean(str3));
console.log(Number('   a1234    '));
console.log(Number('1234a'));
console.log(parseInt('1234a122'));
console.log(parseInt('1234.122'));
console.log(parseFloat('1234.122'));
console.log(parseFloat('1234a122'));
console.log(parseInt('10101100000001', 2));
console.log(+'   1234    ');

console.log('!!str1', !!str1);
console.log('!!', !!'');

// 4. boolean
let yes = true;
let no = false;

console.log( yes.toString() );
console.log( no.toString() );
console.log( +yes, +no);

// 5. null (object)
let n = null;

console.log( String(n) );
console.log( +n ); // 0
console.log( 'Boolean(null)', Boolean(null) );

// 6. undefined
let u = undefined;
let u1;

console.log( String(u) );
console.log( +u ); // NaN
console.log( 'Boolean(u)', Boolean(u) );

const AA = true;

console.log('AA', AA);

AA = 8;
