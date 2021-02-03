import Beer from './beer.js';
import beerApi from './beerApi.js';
import SearchForm from './SearchForm.js';
import Store from './store.js';
import Basket from './basket.js';

const appEl = document.querySelector('.main');
const defaultOptions = {
    per_page: 12,
    page: 1
};

const store = new Store({
    basket: {},
    beers: {}
});

const basket = new Basket(store);

store.addEventListener('update', onStoreUpdate);

new SearchForm(onSearch);

renderBeerList();

function renderApp(children = []) {
    appEl.innerText = '';
    appEl.append(...children);
}

function onSearch(searchValue) {
    return renderBeerList({
        per_page: 12,
        page: 1,
        beer_name: encodeURI(searchValue)
    });
}

function renderBeerList(options = defaultOptions) {
    return beerApi
        .getBeer(options)
        .then(data => {
            const storedBeer = store.get('beers');
            const beers = data.map(beerData => {
                storedBeer[beerData.id] = beerData;

                return new Beer(beerData, {
                    buy: onBuy,
                    decrease: onDecrease,
                });
            });

            store.set('beers', storedBeer);
            renderApp(beers.map(beer => beer.render()));
        });
}

function onBuy(beer) {
    basket.addBeer(beer.id);
    beer.setBuyed(basket.getBeerCount(beer.id));
}

function onDecrease(beer) {
    basket.addBeer(beer.id, -1);
    beer.setBuyed(basket.getBeerCount(beer.id));
}

function onStoreUpdate() {
    console.log(store);
    console.log( basket.getAllPrice() );
}
