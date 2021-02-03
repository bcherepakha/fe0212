import { callOnceAfter } from './utils.js';

export default class SearchForm {
    constructor(onSearch) {
        this._form = document.querySelector('.search');
        this._searchEl = this._form.querySelector('[name="beer_name"]');

        this._searchEl.addEventListener(
            'input',
            callOnceAfter(this.onInput.bind(this), 500)
        );
        this.onSearch = onSearch;
    }

    onInput() {
        if (this.onSearch) {
            this.onSearch(this._searchEl.value);
        }
    }
}
