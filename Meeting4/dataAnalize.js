/** Дана информация о людях ANCESTRY_DATA
 *
 * Используя этот набор данных, подсчитайте:
 *
 * среднюю разницу в возрасте между матерями и их детьми.
 * среднюю разницу в возрасте между родителями
 * среднее количество детей в семье => in home
 * средний возраст людей для каждого из столетий. Назначаем столетию людей, беря их год смерти, деля его на 100 и округляя: `Math.ceil(person.died / 100)`.
*/

/**
 * human = {
    "name": "Carolus Haverbeke",
    "sex": "m",
    "born": 1832,
    "died": 1905,
    "father": "Carel Haverbeke",
    "mother": "Maria van Brussel"
   },
*/

function isFemail(human) {
    return human.sex === 'f';
}

function isChild(human, parentName) {
    return human.father === parentName || human.mother === parentName;
}

function getChildren(ANCESTRY_DATA, parentName) {
    return ANCESTRY_DATA
        .filter(human => isChild(human, parentName));
        // .filter(function(human) {
        //     return isChild(human, parentName);
        // });
}

function getAge(human) {
    return human.died - human.born;
}

function ageDiff(age1, age2) {
    return Math.abs(age1 - age2);
}

function getAverage(arr) {
    return arr.reduce(
        (sum, el) => el + sum,
        0
    ) / arr.length;
}

function getMothersWithChildren(ANCESTRY_DATA) {
    return ANCESTRY_DATA
        .filter(isFemail)
        .map(mother => ({
            mother,
            children: getChildren(ANCESTRY_DATA, mother.name)
        }))
        .filter(data => data.children.length > 0);
}

function task1(ANCESTRY_DATA) {
    return getAverage(
            getMothersWithChildren(ANCESTRY_DATA)
            .map(data => {
                const motherAge = getAge(data.mother);

                return data.children.map(child => getAge(child) - motherAge);
            })
            .reduce(
                (acc, agediff) => acc.concat(agediff),
                []
            )
    );
}

function getFamilyKey(child) {
    return [child.father, child.mother]
        .filter(Boolean)
        .join('+');
}

function getHumanData(humanName, ANCESTRY_DATA) {
    return ANCESTRY_DATA.find(human => human.name === humanName);
}

function getHumanFemalies(human, ANCESTRY_DATA) {
    const children = getChildren(ANCESTRY_DATA, human.name);
    const families = {};

    for (let i=0; i < children.length; i++) {
        const familieKey = getFamilyKey(children[i]);

        if (!families[familieKey]) {
            families[familieKey] = [];
        }

        families[familieKey].push(children[i]);
    }

    return Object.values(families)
        .map(children => ({
            father: getHumanData(children[0].father, ANCESTRY_DATA),
            mother: getHumanData(children[0].mother, ANCESTRY_DATA),
            children
        }));
}

function getFemalies(ANCESTRY_DATA) {
    return Object.values(
        ANCESTRY_DATA
            .flatMap(human => getHumanFemalies(human, ANCESTRY_DATA))
            .reduce(
                (acc, femaly) => {
                    const key = getFamilyKey(femaly.children[0]);

                    acc[key] = femaly;

                    return acc;
                },
                {}
            )
    );
}

function task2(ANCESTRY_DATA) {
    return getAverage(
        getFemalies(ANCESTRY_DATA)
            .filter(femaly => femaly.mother && femaly.father)
            .map(femaly => Math.abs(getAge(femaly.mother) - getAge(femaly.father)))
    )
}

console.log('ANCESTRY_DATA', ANCESTRY_DATA);
console.log('среднюю разницу в возрасте между матерями и их детьми', task1(ANCESTRY_DATA));
console.log('среднюю разницу в возрасте между родителями', task2(ANCESTRY_DATA))
