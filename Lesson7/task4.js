/**
 * Дан обьект с баллами за задание
*/
const grade = {
    Anton: getRandomBall(0, 90),
    Ilya: 90,
    Vladyslav: getRandomBall(),
    Oleksii: getRandomBall(40),
    Vadim: getRandomBall(40, 70),
    Maxim: getRandomBall(15, 80)
};

function getRandomBall(min = 0, max = 100) {
    return Math.round( min + Math.random() * (max - min) );
}

console.log(grade);

/** Требуется:
 1. Указать имя учащегося с максимальным количеством баллов
 2. Указать максимальный балл.
 3. Указать средний балл.
 4. Указать учащегося с баллом ближайшим к среднему.
 5. Перечислить учащихся с баллом ниже среднего.
 6. Перечислить учащихся занявших первые три места в порядке убывания рейтинга.
*/

function getLeader(grade) {
    let leaderName;
    let leaderValue = -Infinity;

    for (const name in grade) {
        if (grade[name] > leaderValue) {
            leaderName = name;
            leaderValue = grade[name];
        }
    }

    return leaderName;
}

function getLeaderValue(grade) {
    const values = Object.values(grade);
    let leaderValue = values[0];

    for (let i=1; i < values.length; i++) {
        if (values[i] > leaderValue) {
            leaderValue = values[i];
        }
    }

    return leaderValue;
}

console.log('Leader', getLeader(grade));
console.log('Leader value', getLeaderValue(grade));
console.log( Object.keys(grade) );
console.log( Object.entries(grade) );
console.log('Leader data', getLeaderData(grade));
console.log('Average value', getAverageValue(grade));
console.log('Average user', getAverageUser(grade));
console.log('Get lost users', getLostUsers(grade));
console.log('Sorted names', sortUsers(grade));
console.log('Leaders', getLeaders(grade));

function getLeaderData(grade) {
    const entries = Object.entries(grade);
    let leader = entries[0];

    for (let i=0; i< entries.length; i++) {
        const user = entries[i];

        if (user[1] > leader[1]) {
            leader = entries[i];
        }
    }

    return leader;
}

function getAverageValue(grade) {
    const values = Object.values(grade);
    let sum = 0;

    function add(value, idx, arr) {
        // console.log({ value, idx, arr });
        sum += value;
    }

    // for (let i=0; i<values.length; i++) {
    //     add(values[i]);
    // }

    // values.forEach(add);

    // return sum / values.length;

    return values.reduce(
        function (sum, value, idx, arr) {
            return sum + value
        },
        0
    ) / values.length;
}

function getAverageUser(grade) {
    const averageValue = getAverageValue(grade);
    const users = Object.keys(grade);
    let [userName] = users;
    let currentDiff = Math.abs(grade[userName] - averageValue);

    for (let i=1; i<users.length; i++) {
        const newDiff = Math.abs(grade[users[i]] - averageValue);

        if (newDiff < currentDiff) {
            userName = users[i];
            currentDiff = newDiff;
        }
    }

    // console.log({ averageValue, users });

    return userName;
}

function getLostUsers(grade) {
    const users = Object.keys(grade);
    const averageValue = getAverageValue(grade);
    // const result = [];

    // users.forEach(function(userName) {
    //     if (grade[userName] < averageValue) {
    //         result.push(userName);
    //     }
    // })

    // return result;

    return users.filter(function(userName) {
        return grade[userName] < averageValue;
    });
}

function sortUsers(grade) {
    const users = Object.keys(grade);

    users.sort(function (name1, name2) {
        return grade[name2] - grade[name1];
    });

    return users;
}

function getLeaders(grade) {
    const sortedUsers = sortUsers(grade);

    sortedUsers.length = 3;

    return sortedUsers;
}
