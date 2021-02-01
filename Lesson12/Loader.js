export class Loader {
    constructor({ root }) {
        this._root = root;
    }

    show() {
        this._root.classList.remove('hide');
    }

    hide() {
        this._root.classList.add('hide');
    }
}
