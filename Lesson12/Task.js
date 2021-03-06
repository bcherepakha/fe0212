import { createElement, classNames } from './lib.js';
import { Events } from './Events.js';

const DOUBLE_CLICK_MAX_TIME = 300;

export class Task {
    constructor(taskData, onRemoveTask) {
        this._data = taskData;
        this._lastClickByText = null;
        this._ckickByTextTimeoutId = null;
        this._edit = false;
        this._onRemoveTask = onRemoveTask;
        this.events = new Events();

        this._createElement();
    }

    get id() {
        return this._data.id;
    }

    get data() {
        return {...this._data};
    }

    toString() {
        return JSON.stringify(this._data);
    }

    _createElement() {
        const { text, completed } = this._data;
        const taskTextEl = createElement('span', { innerText: text });
        const toggleEl = createElement('input', {
            className: 'toggle',
            type: 'checkbox',
            checked: completed
        });
        const destroyBtn = createElement('button', { className: 'destroy' });
        const viewEl = createElement(
            'div',
            { className: 'view '},
            [toggleEl, taskTextEl, destroyBtn]
        );
        const editEl = createElement('input', { className: 'edit', value: text});
        const changeBtn = createElement(
            'button',
            {
                className: 'visually-hidden',
                type: 'submit',
                innerText: 'Изменить'
            });
        const formEl = createElement('form', {}, [editEl, changeBtn]);
        const rootEl = createElement('li', {}, [viewEl, formEl]);

        toggleEl.addEventListener('change', this._setCompleted.bind(this));
        taskTextEl.addEventListener('click', this._onClickByText.bind(this));
        formEl.addEventListener('submit', this._changeTaskText.bind(this));
        destroyBtn.addEventListener('click', this._remove.bind(this));

        this._taskTextEl = taskTextEl;
        this._editEl = editEl;
        this._toggleEl = toggleEl;
        this._rootEl = rootEl;
    }

    changeData(newData, dispatchEvent = true) {
        this._data = {
            ...this._data,
            ...newData
        };

        this.render();

        if (dispatchEvent) {
            this.events.dispatch('change');
        }
    }

    isActive() {
        return !this._data.completed;
    }

    setCompleted(completed) {
        this.changeData({ completed });
    }

    _remove() {
        if (this._onRemoveTask) {
            this._onRemoveTask(this._data.id, this, this._rootEl);
        }
    }

    _setCompleted() {
        this.setCompleted(this._toggleEl.checked);
    }

    _onClickByText() {
        const currentTime = Date.now();

        if (!this._lastClickByText || currentTime - this._lastClickByText > DOUBLE_CLICK_MAX_TIME) {
            this._lastClickByText = currentTime;
            this._ckickByTextTimeoutId = setTimeout(() => { console.log('click event'); }, DOUBLE_CLICK_MAX_TIME);
        } else {
            this._lastClickByText = null;
            clearTimeout(this._ckickByTextTimeoutId);
            this._ckickByTextTimeoutId = null;

            this._editTask();
        }
    }

    _changeTaskText(e) {
        e.preventDefault();
        const text = this._editEl.value;

        this.changeData({ text });
        this._viewTask();
    }

    _editTask() {
        this._edit = true;

        this.render();
    }

    _viewTask() {
        this._edit = false;

        this.render();
    }

    completeTask() {
        this.setCompleted(true);
    }

    unCompleteTask() {
        this.setCompleted(false);
    }

    render() {
        const { text, completed } = this._data;

        this._toggleEl.checked = completed;

        this._taskTextEl.innerText = text;
        this._editEl.value = text;

        this._rootEl.className = classNames(
            completed && 'completed',
            this._edit && 'editing',
        );

        return this._rootEl;
    }
}
