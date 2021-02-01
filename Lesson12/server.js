export class TaskAPI {
    constructor(baseUrl, loader) {
        this._baseUrl = baseUrl;

        if (loader
            && typeof loader.hide === 'function'
            && typeof loader.show === 'function') {
            this._loader = loader;
        } else {
            console.warn('Unexpected loader object', loader);
        }
    }

    fetch(url, options) {
        if (this._loader) {
            this._loader.show();
        }

        return fetch(`${this._baseUrl}${url}`, options)
            .then(response => response.json())
            .then(data => {
                if (this._loader) {
                    this._loader.hide();
                }

                return data;
            })
            .catch(ex => console.log(ex));
    }

    requestDelay() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }

    getTasks() {
        return this.fetch('/tasks');
    }

    updateTask(taskId, taskData) {
        return this.fetch(`/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(taskData)
        });
    }

    removeTask(taskId) {
        return this.fetch(`/tasks/${taskId}`, {
            method: 'DELETE'
        });
    }

    addTask(taskData) {
        return this.fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(taskData)
        });
    }
}
