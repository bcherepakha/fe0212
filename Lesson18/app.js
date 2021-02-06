import Beer from './beer.js';
import beerApi from './beerApi.js';
import SearchForm from './SearchForm.js';
import Store from './store.js';
import Basket from './basket.js';
import { Pagination } from './pagination.js';

let beers;
const appEl = document.querySelector('.main');
const paginationContainer = document.querySelector('.pagination-cards');
const defaultOptions = {
    per_page: 12,
    page: 1
};

const pagination = new Pagination({
    per_page: defaultOptions.per_page,
    container: paginationContainer,
    onChange: onHistoryChanges,
});

const store = new Store({
    basket: {},
    beers: {},
    favorite: {}
});

const basket = new Basket(store);

store.addEventListener('update-favorite', onFavoriteUpdate);
store.addEventListener('update-beers', onBeersUpdate);
window.addEventListener('popstate', onHistoryChanges);

new SearchForm(onSearch);

appStart();

function appStart() {
    console.log('appStart');
    getAllFavourite(); // 0 -> 19
    renderBeerList(); // 1 -> 156
}

function getAllFavourite() {
    return beerApi.getAllFavourite()
        .then(data => {
            store.set('favorite', data.reduce(
                (favorite, {id: storeId, beerId}) => {
                    favorite[beerId] = storeId;
                    return favorite;
                },
                {}
            ));
        });
}

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

function renderBeerList(options = pagination.options) {
    return beerApi
        .getBeer(options)
        .then(data => {
            const storedBeer = store.get('beers');
            const favoriteBeer = store.get('favorite');
            beers = data.map(beerData => {
                storedBeer[beerData.id] = beerData;

                return new Beer(beerData, {
                    buy: onBuy,
                    decrease: onDecrease,
                    togleFavorite: togleFavorite,
                }, beerData.id in favoriteBeer);
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

function togleFavorite(beer) {
    if (!beer.favorite) {
        beerApi.addFavorite(beer.id)
            .then(({id: storeId, beerId}) => {
                const favorite = store.get('favorite');
                favorite[beerId] = storeId;

                store.set('favorite', favorite);
            });
    } else {
        beerApi.deleteFavorite(store.get('favorite')[beer.id])
            .then(({ beerId }) => {
                const favorite = store.get('favorite');

                delete favorite[beerId];

                store.set('favorite', favorite);
            });
    }
}

function setFavorite() {
    if (beers) {
        const favorite = store.get('favorite');

        if (Object.keys(favorite).length > 0) {
            beers.forEach(beer => {
                beer.setFavorite(beer.id in favorite);
            });
        }
    }
}

function onFavoriteUpdate() {
    setFavorite();
}

function onBeersUpdate() {
    setFavorite();
}

function onHistoryChanges() {
    console.log('onHistoryChanges');
    renderBeerList()
        .then(() => pagination.update());
}
