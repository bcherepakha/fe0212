// https://api.punkapi.com/v2/beers?beer_name=Buzz&ibu_gt=50

function getRandomBeer() {
    return fetch('https://api.punkapi.com/v2/beers/random')
        .then(response => response.json());
}
