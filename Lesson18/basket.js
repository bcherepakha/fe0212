const STORAGE_KEY = 'beer_basket';

export default class Basket {
    constructor(store, getBeerData) {
        this._store = store;
        this._getBeerData = getBeerData;
        this._priceEl = document.querySelector('.basket-price');

        this.getFromStore()
            .then((newBasket) => this.updateBasket(newBasket));
    }

    getFromStore() {
        const stringData = localStorage[STORAGE_KEY]; // undefined | string

        if (!stringData) {
            return Promise.resolve({});
        }

        try {
            const data = JSON.parse(stringData);

            return Promise.resolve(data);
        } catch(ex) {
            localStorage[STORAGE_KEY] = '';

            return Promise.resolve({});
        }
    }

    saveInStore() {
        localStorage[STORAGE_KEY] = JSON.stringify(this._store.get('basket'));

        return Promise.resolve();
    }

    updateBasket(newBasket) {
        this._store.set('basket', newBasket);
        this.updatePrice();
        this.saveInStore();
    }

    addBeer(beerId, count = 1) {
        const newBasket = { ...this._store.get('basket') };
        const beerCount = this.getBeerCount(beerId) + count;

        newBasket[beerId] = beerCount;

        this.updateBasket(newBasket);
    }

    getBeerCount(beerId) {
        return this._store.get('basket')[beerId] || 0;
    }

    getBeerPrice(beerId) {
        if (!this._store.get('beers')[beerId]) {
            if (this._getBeerData) {
                this._getBeerData(beerId);
            }


            return 0;
        }

        return this._store.get('beers')[beerId].price || 0;
    }

    getAllPrice() {
        return Object.entries(this._store.get('basket'))
            .map(([beerId, beerCount]) => this.getBeerPrice(beerId) * beerCount)
            .reduce(
                (sum, price) => sum + price,
                0
            );
    }

    updatePrice() {
        this._priceEl.innerText = this.getAllPrice().toFixed(2);
    }
}
