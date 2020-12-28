function getVillianName(d) {
    const dateLastDigit = d.getDate() % 10;
    const monthNumber = d.getMonth();

    return `${getVillianName.MONTHES[monthNumber]} ${getVillianName.DAYS[dateLastDigit]}`;
}

getVillianName.MONTHES = [
    "The Evil",
    "The Vile",
    "The Cruel",
    "The Trashy",
    "The Despicable",
    "The Embarrassing",
    "The Disreputable",
    "The Atrocious",
    "The Twirling",
    "The Orange",
    "The Terrifying",
    "The Awkward",
];

getVillianName.DAYS = [
    "Mustache",
    "Pickle",
    "Hood Ornament",
    "Raisin",
    "Recycling Bin",
    "Potato",
    "Tomato",
    "House Cat",
    "Teaspoon",
    "Laundry Basket",
];

console.log( getVillianName(new Date(2020, 10, 18)) );

function isValidWalk(path) {
    if (path.length !== 10) {
        return false;
    }

    const counters = path.reduce(
        (result, direction) => {
            result[direction] += 1;

            return result;
        },
        {
            n: 0,
            w: 0,
            s: 0,
            e: 0
        }
    );

    // const counters = {
    //     'n': 0,
    //     's': 0,
    //     'w': 0,
    //     'e': 0
    // };

    // for (let i=0; i < path.length; i++) {
    //     const direction = path[i];

    //     counters[direction]++;
    // }

    return counters.n === counters.s && counters.e === counters.w;
}

console.log( isValidWalk(['n', 's', 'w']) ); // false
console.log( isValidWalk(['n' , 's', 'e', 'w', 'n' , 's', 'n' , 's', 'n' , 's'])); // true
