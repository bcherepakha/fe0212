(function(global, libName) {
    const { createElement, classNames } = window['lib-dom']; // createElement = window['lib-dom'].createElement
    const EFFECT_FROM_BOTTOM = 'EFFECT_FROM_BOTTOM';
    const EFFECT_FROM_LEFT = 'EFFECT_FROM_LEFT';
    const EFFECT_FROM_CENTER = 'EFFECT_FROM_CENTER';

    function Slider(props = {}) {
        this._props = props;

        this._effect = props.effect && Slider.effects.includes(props.effect) ? props.effect : Slider.effects[0];

        this._state = {
            currentIndex: 0
        };

        this.init();
        this.clearAndFill();
        this.render();
    }

    Slider.activeClass = 'slider__image--active';
    Slider.effects = [EFFECT_FROM_BOTTOM, EFFECT_FROM_LEFT, EFFECT_FROM_CENTER];
    Slider.effectsByClass = {
        [EFFECT_FROM_BOTTOM]: 'slider__image--from-bottom',
        [EFFECT_FROM_LEFT]: 'slider__image--from-left',
        [EFFECT_FROM_CENTER]: 'slider__image--from-center',
    };

    Slider.prototype.init = function() {
        this._nextBtxn = createElement('button', {
            className: 'slider__control slider__control--next',
            innerText: 'next slide'
        });

        this._prevBtn = createElement('button', {
            className: 'slider__control slider__control--prev',
            innerText: 'previous slide'
        });

        this._nextBtxn.addEventListener('click', this.nextSlide.bind(this));
        this._prevBtn.addEventListener('click', () => this.prevSlide());

        this._body = createElement('div', { className: 'slider__body'});
        this._slides = this._props.images.map(imageSrc => this._createSlide(imageSrc));

        this._body.append(...this._slides);
    };

    Slider.prototype._createSlide = function (imageSrc) {
        return createElement('img', {
            className: classNames(
                'slider__image',
                Slider.effectsByClass[this._effect]
            ),
            src: imageSrc
        });
    };

    Slider.prototype.clearAndFill = function () {
        this._props.rootEl.innerText = '';

        this._props.rootEl.classList.add('slider');
        this._props.rootEl.append(
            this._nextBtxn,
            this._prevBtn,
            this._body
        );
    };

    Slider.prototype.setState = function (newState = {}) {
        this._state = {
            ...this._state,
            ...newState
        };

        this.render();
    };

    Slider.prototype.showSlide = function (slideIndex) {
        this.setState({
            currentIndex: slideIndex
        });
    };

    Slider.prototype.render = function () {
        const activeSlide = this._slides.find(slide => slide.classList.contains(Slider.activeClass));
        const activeStateSlide = this._slides[this._state.currentIndex];

        if (activeSlide) {
            activeSlide.classList.remove(Slider.activeClass);
        }

        if (activeStateSlide) {
            activeStateSlide.classList.add(Slider.activeClass);
        }
    };

    Slider.prototype.nextSlide = function () {
        const { currentIndex } = this._state;
        const slideCount = this._props.images.length;
        const nextIndex = this._props.loop ? (currentIndex + 1) % slideCount : Math.min(currentIndex + 1, slideCount - 1) ;

        this.showSlide(nextIndex);
    };

    Slider.prototype.prevSlide = function () {
        const { currentIndex } = this._state;
        const slideCount = this._props.images.length;
        const nextIndex = this._props.loop ? (slideCount + currentIndex - 1) % slideCount : Math.max(currentIndex - 1, 0) ;

        this.showSlide(nextIndex);
    };

    global[libName] = {
        Slider,
        EFFECT_FROM_BOTTOM,
        EFFECT_FROM_LEFT,
        EFFECT_FROM_CENTER
    };
})(window, 'slider-lib');

new window['slider-lib'].Slider({
    rootEl: document.querySelector('.endedSlider'),
    images: [
        'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1400&amp;q=80',
        'https://images.unsplash.com/photo-1521834029104-b056ecebbb05?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1869&amp;q=80',
        'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80',
        'https://images.unsplash.com/photo-1473172707857-f9e276582ab6?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80',
    ],
    loop: false,
    effect: window['slider-lib'].EFFECT_FROM_CENTER,
});
