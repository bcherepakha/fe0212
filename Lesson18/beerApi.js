import { getRandomPrice, stingifyParams } from './utils.js';

class BeerApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    getBeer(options) {
        return fetch(`${this._baseUrl}${options ? '?' + stingifyParams(options) : ''}`)
            .then(response => response.json())
            .then(data => data.map(beer => ({
                ...beer,
                price: getRandomPrice(),
            })));
    }
}

export default new BeerApi('https://api.punkapi.com/v2/beers');
