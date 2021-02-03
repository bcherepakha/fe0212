export default class Basket {
    constructor(store) {
        this._store = store;
        this._priceEl = document.querySelector('.basket-price');
        this.updatePrice();
    }

    addBeer(beerId, count = 1) {
        const newBasket = { ...this._store.get('basket') };
        const beerCount = this.getBeerCount(beerId) + count;

        newBasket[beerId] = beerCount;

        this._store.set('basket', newBasket);
        this.updatePrice();
    }

    getBeerCount(beerId) {
        return this._store.get('basket')[beerId] || 0;
    }

    getBeerPrice(beerId) {
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
