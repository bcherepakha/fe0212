export class Pagination {
    constructor(props) {
        this._props = props;

        if (this._props.container) {
            this._props.container.innerText = '';
            this.createPagination();
            this._props.container.append(this._root);
        }
    }

    get options() {
        const { page, per_page } = this._props.router.params;

        return {
            per_page: parseInt(per_page) || 12,
            page: parseInt(page) || 1
        };
    }

    createPagination() {
        const root = document.createElement('div');
        const children = [];
        const { page } = this.options;

        root.className = 'ui pagination menu';

        if (page > 1) {
            children.push(this.createBtn('Previous', {
                page: page - 1
            }, false));
        }

        if (page > 1) {
            for (let i=1; i < page; i++) {
                children.push(this.createBtn(i, {
                    page: i
                }, false));
            }
        }

        children.push(this.createBtn(page, {
            page
        }, true));

        children.push(this.createBtn('Next', {
            page: page + 1
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

        btn.href = this._props.router.createUrl({
            ...this._props.router.params,
            ...params
        });
        btn.addEventListener('click', this.onClick.bind(this));

        return btn;
    }

    update() {
        if (this._props.container) {
            this._props.container.innerText = '';
            this.createPagination();
            this._props.container.append(this._root);
        }
    }

    onClick(e) {
        e.preventDefault();

        this._props.router.go(e.target.search);
    }

    render() {
        return this._root;
    }
}
