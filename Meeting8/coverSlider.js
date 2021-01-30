class Slider {
    constructor() {
        this._currentSlide = 0;

        this._root = document.querySelector('.cover-slider');
        this._slides = Array.from(document.querySelectorAll('.cover-slider__item'))
            .map(slideRoot => ({
                root: slideRoot,
                leftBg: slideRoot.querySelector('.cover-slider__item-bg--left'),
                rightBg: slideRoot.querySelector('.cover-slider__item-bg--right'),
                title: slideRoot.querySelector('.cover-slider__item-title'),
            }));

        this._nextBtn = document.querySelector('.cover-slider__control-right');
        this._prevBtn = document.querySelector('.cover-slider__control-left');

        this._nextBtn.style.display = 'none';
        this._prevBtn.style.display = 'none';

        this.showNextAfterTimer();
        // this.showNextAfter(5000);

        // this._nextBtn.addEventListener('click', this.next.bind(this));
        // this._prevBtn.addEventListener('click', this.prev.bind(this));
    }

    startTimer() {
        const timerEl = this.createTimer();

        this._root.append(timerEl);
        setTimeout(() => { timerEl.style.transform = 'scaleX(1)'; }, 0);

        return new Promise(resolve => {
            timerEl.addEventListener('transitionend', resolve);
        }).then(() => timerEl.remove());
    }

    createTimer() {
        const el = document.createElement('div');

        el.className = 'cover__slider-timer';

        return el;
    }

    showNextAfterTimer() {
        return this.startTimer()
            .then(() => this.next())
            .then(() => this.showNextAfterTimer());
    }

    showNextAfter(ms) {
        return delay(ms)
            .then(() => this.next())
            .then(() => this.showNextAfter(ms));
    }

    next() {
        return this.show(this._currentSlide + 1);
    }

    prev() {
        return this.show(this._currentSlide - 1);
    }

    show(nextSlideNumber) {
        const previousSlideNumber = this._currentSlide;

        if (nextSlideNumber < 0) {
            nextSlideNumber = this._slides.length - nextSlideNumber;
        }

        if (nextSlideNumber > this._slides.length - 1) {
            nextSlideNumber = nextSlideNumber % this._slides.length;
        }

        this._currentSlide = nextSlideNumber;

        return this.render(previousSlideNumber, nextSlideNumber);
    }

    startTransition(element, toggledClass) {
        return new Promise(function(resolve) {
            element.addEventListener('transitionend', resolve);
            element.classList.toggle(toggledClass);
        });
    }

    hideSlide(slideNumber) {
        const { root, leftBg, rightBg, title} = this._slides[slideNumber];

        return Promise.all([
            this.startTransition(leftBg, 'cover-slider__item-bg--hide'),
            this.startTransition(rightBg, 'cover-slider__item-bg--hide'),
            delay(300).then(() => this.startTransition(title, 'cover-slider__item-title--hide')),
        ]).then(() => root.classList.remove('cover-slider__item--active'));
    }

    showSlide(slideNumber) {
        const { root, leftBg, rightBg, title} = this._slides[slideNumber];

        return Promise.all([
            this.startTransition(leftBg, 'cover-slider__item-bg--hide'),
            this.startTransition(rightBg, 'cover-slider__item-bg--hide'),
            delay(300).then(() => this.startTransition(title, 'cover-slider__item-title--hide')),
        ]).then(() => root.classList.add('cover-slider__item--active'));
    }

    render(previousSlideNumber, nextSlideNumber) {
        if (previousSlideNumber !== nextSlideNumber) {
            return Promise.all([
                this.hideSlide(previousSlideNumber),
                delay(300).then(() => this.showSlide(nextSlideNumber)),
            ]);
        }

        return Promise.resolve();
    }
}

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

new Slider();
