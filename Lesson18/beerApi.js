import { getRandomPrice, stingifyParams } from './utils.js';

class BeerApi {
    constructor({ base, favorite}) {
        this._baseUrl = base;
        this._favoriteUrl = favorite;
    }

    getBeer(options) {
        return fetch(`${this._baseUrl}${options ? '?' + stingifyParams(options) : ''}`)
            .then(response => response.json())
            .then(data => data.map(beer => ({
                ...beer,
                price: getRandomPrice(),
            })));
    }

    getAllFavourite() {
        return fetch(this._favoriteUrl)
            .then(response => response.json());
    }

    addFavorite(beerId) {
        return fetch(`${this._favoriteUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                beerId
            })
        })
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    deleteFavorite(beerStoreId) {
        return fetch(`${this._favoriteUrl}/${beerStoreId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .catch(error => console.log(error));
    }

}

export default new BeerApi({
    base: 'https://api.punkapi.com/v2/beers',
    favorite: 'https://5d9969125641430014051850.mockapi.io/favoriteBeer'
});
