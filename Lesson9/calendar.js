'use strict';

function LocalDate(yearNum, monthNum, dayNum) {
    // this = { __proto__: LocalDate.prototype }

    this._d = new Date(yearNum, monthNum - 1, dayNum);

    // return this;
}

LocalDate.MONTHES = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
LocalDate.MONTHESINDAY = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
LocalDate.DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

LocalDate.prototype.getDate = function () {
    return this._d.getDate();
};

LocalDate.prototype.getMonthNum = function() {
    return this._d.getMonth() + 1;
};

LocalDate.prototype.getMonthName = function() {
    return LocalDate.MONTHES[this._d.getMonth()];
};

LocalDate.prototype.getFullYear = function() {
        return this._d.getFullYear();
};

LocalDate.prototype.getDay = function() {
    return (this._d.getDay() - 1 + 7) % 7;
};

LocalDate.prototype.getDayNames = function() {
    return LocalDate.DAYS[this.getDay()];
};

LocalDate.prototype.toString = function() {
    return `${this.getDayNames()}, ${this.getDate()} ${LocalDate.MONTHESINDAY[this._d.getMonth()]} ${this.getFullYear()}`;
};


function Calendar(monthNum, yearNum, rootSelector) {
    // this = { __proto__: Calendar.prototype }

    this._rootEl = document.querySelector(rootSelector);

    this._createMonthParam(monthNum, yearNum);
    this._init();
    this._fillHeader();
    this._fillDays();
}

Calendar.prototype._shiftMonth = function (shiftMonth) {
    this._createMonthParam(this.monthNum + shiftMonth, this.yearNum);
    this._fillHeader();
    this._fillDays();
}

Calendar.prototype._createMonthParam = function(monthNum, yearNum) {
    this.firstDay = new LocalDate(yearNum, monthNum, 1);
    this.monthNum = this.firstDay.getMonthNum();
    this.yearNum = this.firstDay.getFullYear();
    this.lastDay = new LocalDate(yearNum, monthNum + 1, 0);
    this.monthDays = [];

    const lastDayNum = this.lastDay.getDate() + 6 - this.lastDay.getDay();

    for (let dayNum = 1 - this.firstDay.getDay(); dayNum <= lastDayNum; dayNum++) {
        this.monthDays.push(new LocalDate(this.yearNum, this.monthNum, dayNum));
    }
}

Calendar.prototype._init = function () {
    if (this._rootEl === null) {
        this._rootEl = document.createElement('div');

        this._rootEl.className = 'calendar';
    } else {
        this._headerEl = this._rootEl.querySelector('.calendar-header');
        this._dayNamesEl = this._rootEl.querySelector('.calendar-dayNames');
        this._daysEl = this._rootEl.querySelector('.calendar-days');
    }

    if (!this._headerEl) {
        this._headerEl = document.createElement('div');
        this._headerEl.className = 'calendar-header';
    }

    if (!this._dayNamesEl) {
        this._dayNamesEl = document.createElement('ul');
        this._dayNamesEl.className = 'calendar-dayNames';

        const dayNamesColl = LocalDate.DAYS.map(dayName => {
            const dayEl = document.createElement('li');

            dayEl.innerText = dayName;

            return dayEl;
        });

        this._dayNamesEl.append(...dayNamesColl);
    }

    if (!this._daysEl) {
        this._daysEl = document.createElement('ul');
        this._daysEl.className = 'calendar-days';
    }

    if (!this._prevButton) {
        this._prevButton = document.createElement('button');

        this._prevButton.innerText = ' < ';

        this._prevButton.addEventListener('click', this._shiftMonth.bind(this, -1));
    }

    if (!this._nextButton) {
        this._nextButton = document.createElement('button');

        this._nextButton.innerText = ' > ';

        this._nextButton.addEventListener('click', this._shiftMonth.bind(this, 1));
    }

    if (!this._headerTextEl) {
        this._headerTextEl = document.createElement('span');
    }

    this._rootEl.append(this._headerEl, this._dayNamesEl, this._daysEl);
    this._headerEl.innerText = '';
    this._headerEl.append(this._prevButton, this._headerTextEl, this._nextButton);
}

Calendar.prototype._fillHeader = function () {
    this._headerTextEl.innerText = `${this.firstDay.getMonthName()} ${this.firstDay.getFullYear()}`;
}

Calendar.prototype._renderDay = function (localDay) {
    const el = document.createElement('li');

    el.innerText = localDay.getDate();

    el.className = 'calendar-day';

    if (localDay.getMonthNum() !== this.monthNum) {
        el.classList.add('calendar-day--not-in-month');
    }

    return el;
}

Calendar.prototype._fillDays = function() {
    const monthDaysColl = this.monthDays.map(this._renderDay, this);

    this._daysEl.innerText = '';
    this._daysEl.append(...monthDaysColl);
}

const currentCalendar = new Calendar(12, 2020, '.test-calendar');

const a = {}; // a = new Object(); a.__proto__ = Object.prototype
const d = new Date(); // d.__proto__ = Date.prototype
const ld = new LocalDate(2020, 12, 30); // ld.__proto__ = LocalDate.prototype

console.log( a );
console.dir( d );
console.log( ld );

const animal = {
    eat: true,
    drink: true,
    run: function() { console.log('run'); },
};

const rabbit = {
    type: 'rabbit',
    jump: function() { console.log('jump'); },
    run: function() { console.log('rabbit only jumps'); },
    __proto__: animal
}

console.log( rabbit );
console.log( rabbit.drink );
rabbit.run();

rabbit.drink = false;
console.log(animal, rabbit.drink );
