import { parseParams, stingifyParams } from './utils.js';

export default class Router {
    constructor(onChange, routes = {}) {
        this._onChange = onChange;
        this._routes = routes;

        if (this._onChange) {
            window.addEventListener('popstate', this._onChange);
        } else {
            throw Error('props onChange is required in Router');
        }
    }

    get currentRoute() {
        const { route = 'default' } = this.params;

        return this._routes[route] || this._routes.default;
    }

    get params() {
        return parseParams();
    }

    createUrl(params = {}) {
        return '?' + stingifyParams(params);
    }

    go(url) {
        console.log(url, parseParams(url));
        this.push(parseParams(url));
    }

    push(params) {
        history.pushState('', '', this.createUrl(params));

        if (this._onChange) {
            this._onChange();
        }
    }
}
