class Slider {
    constructor() {
        this._currentSlide = 0;

        const { countVisible, shiftItem } = this.getVisibleParams();

        this._countVisible = countVisible;
        this._shiftItem = shiftItem;

        this._root = document.querySelector('.slider');
        this._body = document.querySelector('.slider__wrapper');
        this._slides = document.querySelectorAll('.slider__item');

        this._prevBtn = document.querySelector('.slider__control-left');
        this._nextBtn = document.querySelector('.slider__control-right');

        this._prevBtn.addEventListener('click', e => {
            e.preventDefault();
            this.prev();
        });

        this._nextBtn.addEventListener('click', e => {
            e.preventDefault();
            this.next();
        });
    }

    getVisibleParams() {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            return {
                countVisible: 4,
                shiftItem: 25
            };
        }

        if (window.matchMedia('(min-width: 992px)').matches) {
            return {
                countVisible: 3,
                shiftItem: 100 / 3
            };
        }

        if (window.matchMedia('(min-width: 576px)').matches) {
            return {
                countVisible: 2,
                shiftItem: 50
            };
        }

        return {
            countVisible: 1,
            shiftItem: 100
        };
    }

    next() {
        return this.show(this._currentSlide + 1);
    }

    prev() {
        return this.show(this._currentSlide - 1);
    }

    show(slideNumber) {
        this._currentSlide = Math.min(Math.max(slideNumber, 0), this._slides.length - this._countVisible);

        this.render();
    }

    render() {
        this._body.style.transform = `translateX(-${this._currentSlide * this._shiftItem}%)`;
    }
}

new Slider();
