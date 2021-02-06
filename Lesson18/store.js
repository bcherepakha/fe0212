export default class Store {
    constructor(initialData = {}) {
        this._store = initialData;
        this._eventListeners = {};
    }

    get(key) {
        return this._store[key];
    }

    set(key, data) {
        this._store[key] = data;
        this.trigger('update');
        this.trigger(`update-${key}`);
    }

    addEventListener(eventName, callback) {
        if (!this._eventListeners[eventName]) {
            this._eventListeners[eventName] = [];
        }

        this._eventListeners[eventName].push(callback);
    }

    removeEventListener(eventName, callback) {
        if (this._eventListeners[eventName]) {
            this._eventListeners[eventName] = this._eventListeners[eventName]
                .filter(fn => fn !== callback);
        }
    }

    trigger(eventName) {
        if (this._eventListeners[eventName]) {
            this._eventListeners[eventName].forEach(fn => fn());
        }
    }
}
