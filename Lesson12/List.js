export default class List {
    constructor(props) {
        this._props = props;

        this.clear();
    }

    changeProps(newProps) {
        this._props = {
            ...this._props,
            ...newProps
        };
    }

    addItem(newItem) {
        this._props.items.push(newItem);
        this._props.listEl.append(newItem);
    }

    removeItem(removedItem) {
        this._props.items = this._props.items.filter(item => item !== removedItem);
        removedItem.remove();
    }

    getCount() {
        return this._props.items.length;
    }

    clear() {
        this._props.listEl.innerText = '';
    }

    render() {
        this.clear();
        this._props.listEl.append(...this._props.items);

        return this._props.listEl;
    }
}

// { default: List }
