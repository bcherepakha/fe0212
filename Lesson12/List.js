import { EventsMixin } from './Events.js';

export default class List {
    constructor(props) {
        // super();
        this._props = props;

        this.clear();
    }

    changeProps(newProps) {
        this._props = {
            ...this._props,
            ...newProps
        };

        this.render();

        if (this._props.onListUpdate) {
            this._props.onListUpdate();
        } else {
            this.dispatch('update');
        }
    }

    addItem(newItem) {
        this._props.items.push(newItem);
        this._props.listEl.append(newItem);

        if (this._props.onListUpdate) {
            this._props.onListUpdate();
        } else {
            this.dispatch('update');
        }
    }

    removeItem(removedItem) {
        this._props.items = this._props.items.filter(item => item !== removedItem);
        removedItem.remove();

        if (this._props.onListUpdate) {
            this._props.onListUpdate();
        } else {
            this.dispatch('update');
        }
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

console.log(EventsMixin);
Object.assign(List.prototype, EventsMixin);

// console.dir( List );
