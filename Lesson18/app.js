import Beer from './beer.js';
import beerApi from './beerApi.js';
import SearchForm from './SearchForm.js';
import Store from './store.js';
import Basket from './basket.js';
import { Pagination } from './pagination.js';
import Router from './router.js';

let beers;
const appEl = document.querySelector('.main');
const paginationContainer = document.querySelector('.pagination-cards');

const router = new Router(
    onHistoryChanges, {
        default: renderBeerList,
        favourites: renderFavorites
    });

const pagination = new Pagination({
    container: paginationContainer,
    router
});

const store = new Store({
    basket: {},
    beers: {},
    favorite: {}
});

const basket = new Basket(store, getBeerData);

store.addEventListener('update-favorite', setFavorite);
store.addEventListener('update-basket', setBuyed);
store.addEventListener('update-beers', () => { setBuyed(); setFavorite(); });

const searchForm = new SearchForm(router);

appStart();

function appStart() {
    getAllFavourite()
        .then(() => router.currentRoute());
}

function getBeerData(beerId) {
    return beerApi.getBeer({ ids: beerId })
        .then(data => {
            if (!data || !data[0]) {
                return ;
            }

            const storedBeer = store.get('beers');
            const beerData = data[0];

            storedBeer[beerData.id] = beerData;

            store.set('beers', storedBeer);
        });
}

function getAllFavourite() {
    return beerApi.getAllFavourite()
        .then(data => {
            store.set('favorite', data.reduce(
                (favorite, {id: storeId, beerId}) => {
                    favorite[beerId] = +storeId;

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

function renderFavorites() {
    const favorite = Object.values(store.get('favorite'));
    const options = {
        ...router.params,
        ...pagination.options,
        ids: favorite.join('|')
    };

    if (!options.ids) {
        return Promise.resolve([]);
    }

    if (!options.beer_name) {
        delete options.beer_name;
    }

    delete options.route;

    return beerApi
        .getBeer(options)
        .then(renderBeerData);
}

function renderBeerList() {
    const options = {
        ...router.params,
        ...pagination.options
    };

    if (!options.beer_name) {
        delete options.beer_name;
    }

    delete options.route;

    return beerApi
        .getBeer(options)
        .then(renderBeerData);
}

function renderBeerData(data) {
    const storedBeer = store.get('beers');
    beers = data.map(beerData => {
        storedBeer[beerData.id] = beerData;

        return new Beer(beerData, {
            buy: onBuy,
            decrease: onDecrease,
            togleFavorite: togleFavorite,
        }, false);
    });

    store.set('beers', storedBeer);
    renderApp(beers.map(beer => beer.render()));
    setFavorite();
    setBuyed();
    basket.updatePrice();
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
        const favorite = Object.values(store.get('favorite'));

        if (favorite.length > 0) {
            beers.forEach(beer => {
                beer.setFavorite(favorite.includes(beer.id));
            });
        }
    }
}

function setBuyed() {
    if (beers) {
        beers.forEach(beer => beer.setBuyed(basket.getBeerCount(beer.id)));
    }
}

function onHistoryChanges() {
    router.currentRoute()
        .then(() => pagination.update())
        .then(() => searchForm.update());
}
