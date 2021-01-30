class Nav {
    constructor() {
        this._animated = false;
        this._menuEl = document.querySelector('.menu');
        this._hamburgerEl = document.querySelector('.transform-hamburger');
        this._navEl = document.querySelector('.menu__wrapper');

        this._hamburgerEl.addEventListener('click', this.toggle.bind(this));
        this._menuEl.addEventListener('transitionend', this.endTransition.bind(this));
    }

    endTransition(e) {
        const lastMenuItem = this._navEl.children[this._navEl.children.length - 1];

        if (e.target === lastMenuItem && e.propertyName === 'opacity') {
            this._animated = false;
        }
    }

    show() {
        this._animated = true;
        this._hamburgerEl.classList.add('transform-hamburger--transformed');
        this._navEl.classList.add('menu__wrapper--open');
    }

    hide() {
        this._animated = true;
        this._hamburgerEl.classList.remove('transform-hamburger--transformed');
        this._navEl.classList.remove('menu__wrapper--open');
    }

    toggle() {
        if (this._animated) {
            return ;
        }

        this._animated = true;
        this._hamburgerEl.classList.toggle('transform-hamburger--transformed');
        this._navEl.classList.toggle('menu__wrapper--open');
    }
}

new Nav();
