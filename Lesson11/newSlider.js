const { Slider } = window['slider-lib'];
const { createElement, classNames } = window['lib-dom'];
const EFFECT_TRANSPORT = 'EFFECT_TRANSPORT';

function NewSlider(props = {}) {
    // this = {}
    // this.__propto__ = NewSlider.prototype

    Slider.call(this, props);

    this._effect = props.effect && NewSlider.effects.includes(props.effect) ? props.effect : NewSlider.effects[0];

    this.init();
    this.clearAndFill();
    this.render();

    // return this;
}

NewSlider.effects = [...Slider.effects, EFFECT_TRANSPORT];
NewSlider.effectsByClass = {
    ...Slider.effectsByClass,
    [EFFECT_TRANSPORT]: 'slider__image--transport'
};

NewSlider.prototype.__proto__ = Slider.prototype;
NewSlider.prototype.init = function () {
    Slider.prototype.init.call(this);

    this._bodyTransportLine = createElement('div', { className: 'slider__body-transport-line'});
    this._body.append(this._bodyTransportLine);
    this._bodyTransportLine.append(...this._slides);
};

NewSlider.prototype._createSlide = function (imageSrc) {
    return createElement('img', {
        className: classNames(
            'slider__image',
            NewSlider.effectsByClass[this._effect]
        ),
        src: imageSrc
    });
};

NewSlider.prototype.render = function () {
    const { currentIndex } = this._state;

    this._bodyTransportLine.style = `transform: translateX(${-currentIndex * 100}%)`;
};

new NewSlider({
    rootEl: document.querySelector('.loopSlider'),
    images: [
        'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1400&amp;q=80',
        'https://images.unsplash.com/photo-1521834029104-b056ecebbb05?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1869&amp;q=80',
        'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80',
        'https://images.unsplash.com/photo-1473172707857-f9e276582ab6?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80',
    ],
    loop: true,
    effect: EFFECT_TRANSPORT,
});
