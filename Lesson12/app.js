// APP:
// 1. AddTaskForm
// 2. Task
// 3. List
// 4. Counter
// 5. Filter
// 6. Server: https://mockapi.io/projects/5d9969125641430014051851

import { AddTaskForm } from './AddTaskForm.js';
import { Task } from './Task.js';
import List from './List.js';
import Counter from './Counter.js';
import Filter from './Filter.js';

let tasks = [];

new AddTaskForm({
    formEl: document.querySelector('.header'),
    onAddTask
});

const list = new List({
    listEl: document.querySelector('.todo-list'),
    items: [],
    // onListUpdate
});

const counter = new Counter({
    rootEl: document.querySelector('.todo-count strong')
});

const filter = new Filter({
    rootEl: document.querySelector('.filters')
});

appInit();

function appInit() {
    filter.addEventListener('change', onFilterChange);
    list.addEventListener('update', onListUpdate);
    counter.setCount( list.getCount() );

    getDataFromLocalStorage();
}

function createTask(taskData) {
    const task = new Task({...taskData, id: Date.now()}, onRemoveTask);

    task.events.addEventListener('change', onTaskChange.bind(null, task));

    return task;
}

function onAddTask(taskData) {
    const task = createTask(taskData);

    tasks.push(task);

    if (isShown(task)) {
        list.addItem(task.render());
    }

    updateLocalStorage();
}

function onRemoveTask(taskId, task, taskEl) {
    tasks = tasks.filter(t => t.id !== taskId);

    if (isShown(task)) {
        list.removeItem(taskEl);
    }

    updateLocalStorage();
}

function onListUpdate() {
    counter.setCount( list.getCount() );
}

function getShownTask() {
    const currentFilter = filter.value;
    const shownTasks = tasks.filter(task => isShown(task, currentFilter));

    return shownTasks;
}

function isShown(task, currentFilter = filter.value) {
    if (currentFilter === '#/all') {
        return true;
    } else if (currentFilter === '#/active') {
        return task.isActive();
    }

    return !task.isActive();
}

function onFilterChange() {
    const shownTasks = getShownTask();

    list.changeProps({
        items: shownTasks.map(task => task.render())
    });
}

function onTaskChange(task) {
    if (!isShown(task)) {
        list.removeItem(task.render());
    }

    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.tasks = JSON.stringify(tasks.map(t => t.toString()));
}

function getDataFromLocalStorage() {
    if (localStorage.tasks) {
        try {
            tasks = JSON.parse(localStorage.tasks).map(s => {
                const taskData = JSON.parse(s);
                const task = createTask(taskData);

                return task;
            });

            onFilterChange();
        } catch(ex) {
            localStorage.removeItem('tasks');
        }
    }
}
