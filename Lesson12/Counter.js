export default class Counter {
    constructor(props) {
        this._props = props;
        this._count = parseInt(this._props.rootEl.innerText, 10);
    }

    setCount(value) {
        this._count = value;
        this.render();
    }

    getCount() {
        return this._count;
    }

    render() {
        this._props.rootEl.innerText = this._count.toString();

        return this._props.rootEl;
    }
}
