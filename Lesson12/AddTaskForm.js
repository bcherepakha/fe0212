export class AddTaskForm {
    constructor(props = {}) {
        // this = {}

        this._props = props;
        this._completeEl = this._props.formEl.querySelector('.complete-all');
        this._taskTextEl = this._props.formEl.querySelector('.new-todo');

        this._props.formEl.addEventListener('submit', this.addTask.bind(this));

        // return this
    }

    addTask(e) {
        e.preventDefault();
        const text = this._taskTextEl.value;
        const completed = this._completeEl.checked;
        const taskData = {
            id: Date.now(),
            creation_time: new Date(),
            text,
            completed
        };

        this._taskTextEl.value = '';

        if (this._props.onAddTask) {
            // this._props.onAddTask(taskData);
            this._props.onAddTask.call(this, taskData);
        }
    }
}
