export class Events {
    constructor() {
        this._events = {
            // 'click': [fn, fn1, fn2]
        };
    }

    addEventListener(eventName, callback) {
        if (!this._events) {
            this._events = {};
        }

        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }

        this._events[eventName].push(callback);
    }

    removeEventListener(eventName, callback) {
        if (!this._events || !this._events[eventName]) {
            return ;
        }

        this._events[eventName] = this._events[eventName].filter(fn => fn !== callback);
    }

    dispatch(eventName) {
        if (!this._events || !this._events[eventName]) {
            return ;
        }

        this._events[eventName].forEach(callback => callback());
    }
}

export const EventsMixin = {
    addEventListener(eventName, callback) {
        if (!this._events) {
            this._events = {};
        }

        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }

        this._events[eventName].push(callback);
    },

    removeEventListener(eventName, callback) {
        if (!this._events || !this._events[eventName]) {
            return ;
        }

        this._events[eventName] = this._events[eventName].filter(fn => fn !== callback);
    },

    dispatch(eventName) {
        if (!this._events || !this._events[eventName]) {
            return ;
        }

        this._events[eventName].forEach(callback => callback());
    }
};
