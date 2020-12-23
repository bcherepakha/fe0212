// 1. Вывести в консоль числа от 1 до n, где n - это произвольное целое число большее 1.
// 2. Вывести в консоль простые числа от 1 до n.
// 3. Вывести в консоль числа кратные k, в диапазоне от 1 до n. => in home
// 4. В первых трех задачах добавить пользователю возможность ввести значения переменных.
// 5. Выводить в консоль простые числа от 1 до n до тех пор, пока пользователь не скажет хватить.

function getNumbers(from, to) {
    console.log({ from, to });
    const result = []; // result = new Array();

    // for (let i=0; i <= to - from; i++) {
    //     result[i] = i + from;
    // }

    for (let i=from; i <= to; i++) {
        result.push(i);
    }

    return result;
}

// const n = +prompt('Get n', 12);

// console.log( getNumbers(1, n) );

function isSimple(n) {
    for (let d=2; d<n; d++) {
        if (n % d === 0) {
            return false;
        }
    }

    return true;
}

function getSimpleNumbers() {
    const from = +prompt('Enter from: ', 1);
    const to = +prompt('Enter to: ', 20);
    const result = [];

    // for (let i=from; i <= to; i++) {
    //     console.log(i);
    // }

    let i = from;

    while (i <= to) {
        if (isSimple(i)) {
            result.push(i);
        }

        i++;
    }

    return result;
}

function getMultiplesNumbers(from, to, k) {

}

console.log( getMultiplesNumbers(10, 20, 5) ); // [10, 15, 20]

// console.log( getSimpleNumbers(12, 18) );

// console.log( isSimple(5) );
