// APP:
// 1. AddTaskForm
// 2. Task
// 3. List
// 4. Counter
// 5. Filter

import { AddTaskForm } from './AddTaskForm.js';
import { Task } from './Task.js';
import List from './List.js';

const addTaskForm = new AddTaskForm({
    formEl: document.querySelector('.header'),
    onAddTask
});

const list = new List({
    listEl: document.querySelector('.todo-list'),
    items: []
});

function onAddTask(taskData) {
    const task = new Task(taskData);

    list.addItem(task.render());
}
