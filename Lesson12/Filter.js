import { Events } from './Events.js';

const SELECTED_LINK = 'selected';

export default class Filter extends Events {
    constructor(props) {
        super();

        this._props = props;
        // this._links = Array.from(this._props.rootEl.querySelectorAll('a'));
        // this._links = [...this._props.rootEl.querySelectorAll('a')];
        this._links = this._props.rootEl.querySelectorAll('a');
        this._filters = Array.prototype.map.call(this._links, link => link.hash);

        const selectedLink = Array.prototype.find.apply(this._links, [link => link.classList.contains(SELECTED_LINK)]);
        const selectedValue = selectedLink && selectedLink.hash;
        const defaultValue = this._filters[0];
        const urlHash = window.location.hash;

        this._currentFilter = urlHash || selectedValue || defaultValue;
        this._changeFilter = this._changeFilter.bind(this);

        this._links.forEach(link => link.addEventListener('click', this._changeFilter));

        this.render();
    }

    _changeFilter(e) {
        const { currentTarget } = e;

        this.value = currentTarget.hash;
    }

    get value() {
        return this._currentFilter;
    }

    set value(currentFilter) {
        if (this._currentFilter !== currentFilter && this._filters.includes(currentFilter)) {
            this._currentFilter = currentFilter;
            this.render();
            this.dispatch('change');
        }
    }

    render() {
        this._links.forEach(link => {
            const isActive = link.hash === this._currentFilter;

            if (isActive) {
                if (!link.classList.contains(SELECTED_LINK)) {
                    window.location.assign(link.href);
                }

                link.classList.add(SELECTED_LINK);
            } else {
                link.classList.remove(SELECTED_LINK);
            }
        });
    }
}
