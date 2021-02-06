import { parseParams, stingifyParams } from './utils.js';

export class Pagination {
    constructor(props) {
        this._props = props;

        const { page, per_page } = parseParams();

        this._page = +page || 1;
        this._per_page = +per_page || props.per_page || 12;

        if (this._props.container) {
            this._props.container.innerText = '';
            this.createPagination();
            this._props.container.append(this._root);
        }
    }

    get options() {
        return {
            per_page: this._per_page,
            page: this._page
        };
    }

    createPagination() {
        const root = document.createElement('div');
        const children = [];

        root.className = 'ui pagination menu';

        if (this._page > 1) {
            children.push(this.createBtn('Previous', {
                page: this._page - 1
            }, false));
        }

        if (this._page > 1) {
            for (let i=1; i < this._page; i++) {
                children.push(this.createBtn(i, {
                    page: i
                }, false));
            }
        }

        children.push(this.createBtn(this._page, {
            page: this._page
        }, true));

        children.push(this.createBtn('Next', {
            page: this._page + 1
        }, false));

        root.append(...children);
        this._root = root;
    }

    createBtn(name, params, active) {
        const btn = document.createElement('a');

        btn.className = 'item';
        btn.innerText = name;

        if (active) {
            btn.classList.add('active');
        }

        btn.href = '?' + stingifyParams(params);
        btn.addEventListener('click', this.onClick.bind(this));

        return btn;
    }

    update() {
        const { page, per_page } = parseParams();

        this._page = +page || this._page;
        this._per_page = +per_page || this._per_page;

        if (this._props.container) {
            this._props.container.innerText = '';
            this.createPagination();
            this._props.container.append(this._root);
        }
    }

    onClick(e) {
        e.preventDefault();

        const { page } = parseParams(e.target.href);

        history.pushState(`Page ${page}`, '', e.target.href);

        if (this._props.onChange) {
            this._props.onChange();
        }
    }

    render() {
        return this._root;
    }
}
