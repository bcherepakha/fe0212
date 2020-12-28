/**
 * localDate
 *
 * @param {Number} yearNum      1970 - 2021 ...
 * @param {Number} monthNum     1 - 12
 * @param {Number} dayNum       1 - 31
 */
function localDate(yearNum, monthNum, dayNum) {
    const localDateObj = {
        _d: new Date(yearNum, monthNum - 1, dayNum),
        getDate() {
            return localDateObj._d.getDate();
        },
        getMonthNum() {
            return localDateObj._d.getMonth() + 1;
        },
        getMonthName() {
            return localDate.MONTHES[localDateObj._d.getMonth()];
        },
        getFullYear() {
            return localDateObj._d.getFullYear();
        },
        getDay() {
            return (localDateObj._d.getDay() - 1 + 7) % 7;
        },
        getDayNames() {
            return localDate.DAYS[localDateObj.getDay()];
        },
        toString() {
            return `${localDateObj.getDayNames()}, ${localDateObj.getDate()} ${localDate.MONTHESINDAY[localDateObj._d.getMonth()]} ${localDateObj.getFullYear()}`
        }
    };

    return localDateObj;
}

localDate.MONTHES = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
localDate.MONTHESINDAY = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
localDate.DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

console.log( localDate(2020, 12, 28).toString() );

function calendar(monthNum, yearNum, rootSelector) {
    const firstDay = localDate(yearNum, monthNum, 1);
    const lastDay = localDate(yearNum, monthNum + 1, 0);
    const monthDays = [];
    const lastDayNum = lastDay.getDate() + 6 - lastDay.getDay();
    let _rootEl = document.querySelector(rootSelector);
    let _headerEl, _dayNamesEl, _daysEl;

    if (_rootEl === null) {
        _rootEl = document.createElement('div');

        _rootEl.className = 'calendar';
    } else {
        _headerEl = _rootEl.querySelector('.calendar-header');
        _dayNamesEl = _rootEl.querySelector('.calendar-dayNames');
        _daysEl = _rootEl.querySelector('.calendar-days');
    }

    if (!_headerEl) {
        _headerEl = document.createElement('div');
        _headerEl.className = 'calendar-header';
    }

    if (!_dayNamesEl) {
        _dayNamesEl = document.createElement('ul');
        _dayNamesEl.className = 'calendar-dayNames';

        // localDate.DAYS.forEach(dayName => {
        //     const dayEl = document.createElement('li');

        //     dayEl.innerText = dayName;

        //     _dayNamesEl.append(dayEl);
        // });

        const dayNamesColl = localDate.DAYS.map(dayName => {
            const dayEl = document.createElement('li');

            dayEl.innerText = dayName;

            return dayEl;
        });

        _dayNamesEl.append(...dayNamesColl);
    }

    if (!_daysEl) {
        _daysEl = document.createElement('ul');
        _daysEl.className = 'calendar-days';
    }

    _rootEl.append(_headerEl, _dayNamesEl, _daysEl);

    for (let dayNum = 1 - firstDay.getDay(); dayNum <= lastDayNum; dayNum++) {
        monthDays.push(localDate(yearNum, monthNum, dayNum));
    }

    function _fillHeader() {
        _headerEl.innerText = `${firstDay.getMonthName()} ${firstDay.getFullYear()}`;
    }

    function _renderDay(localDay) {
        const el = document.createElement('li');

        el.innerText = localDay.getDate();

        el.className = 'calendar-day';

        if (localDay.getMonthNum() !== monthNum) {
            el.classList.add('calendar-day--not-in-month');
        }

        return el;
    }

    function _fillDays() {
        const monthDaysColl = monthDays.map(_renderDay)

        _daysEl.innerText = '';
        _daysEl.append(...monthDaysColl);
    }

    _fillHeader();
    _fillDays();

    return {
        _rootEl,
        _headerEl,
        _dayNamesEl,
        _daysEl,
        firstDay,
        lastDay,
        monthDays,
        render() {
            return _rootEl;
        }
    };
}

console.log( calendar(11, 2020, '.test-calendar') );
console.log( calendar(12, 2020, '.second-calendar') );

const thirdCalendar = calendar(1, 2021, '.third-calendar');

console.log( thirdCalendar );

document.body.append( thirdCalendar.render() );
