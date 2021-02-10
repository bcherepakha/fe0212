import { callOnceAfter } from './utils.js';

export default class SearchForm {
    constructor(router) {
        this._router = router;
        this._form = document.querySelector('.search');
        this._searchEl = this._form.querySelector('[name="beer_name"]');

        this.update();

        this._searchEl.addEventListener(
            'input',
            callOnceAfter(this.onInput.bind(this), 500)
        );
    }

    update() {
        this._searchEl.value = this._router.params['beer_name'] || '';
    }

    onInput() {
        if (this._router) {
            this._router.push({
                ...this._router.params,
                page: 1,
                beer_name: encodeURI(this._searchEl.value)
            });
        }
    }
}
