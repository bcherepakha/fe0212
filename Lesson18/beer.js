export default class Beer {
    constructor(beerData, eventHandlers, favorite = false) {
        this._data = beerData;
        this._favorite = favorite;
        this._eventHandlers = eventHandlers;
        this._buyed = 0;
        this.createCard();
    }

    get id() {
        return this._data.id;
    }

    get favorite() {
        return this._favorite;
    }

    setBuyed(value = 0) {
        this._buyed = value;
        this.render();
    }

    setFavorite(favorite) {
        this._favorite = favorite;
        this.render();
    }

    togleFavorite() {
        this.setFavorite(!this._favorite);
    }

    createCard() {
        const {
            description,
            image_url: imageUrl,
            name,
            price
        } = this._data;
        const root = document.createElement('div');

        root.className = 'card';

        root.innerHTML = `
            <div class="image">
                <img src="${imageUrl}">
            </div>
            <div class="content">
            <div class="header">
                <span>
                    ${name}
                </span>
                <span class="right floated">
                    ${price} UAH
                </span>
            </div>
            <div class="description">
                ${description}
            </div>
            </div>
            <div class="extra content">
            <div class="ui vertical animated small blue button left floated card__buy" tabindex="0">
                <div class="hidden content">Buy</div>
                <div class="visible content">
                    <i class="shop icon"></i>
                </div>
            </div>
            <form class="card__count left floated card__buy-count-form" hidden>
                <button type="button" class="ui icon small button card__count-back">
                    <i class="left chevron icon"></i>
                </button>
                <div class="ui input card__count-value">
                    <input type="text">
                </div>
                <button type="button" class="ui right icon small button card__count-add">
                    <i class="right chevron icon"></i>
                </button>
            </form>
            <div class="right floated card__favorite">
                <i class="star icon big grey"></i>
                <!-- yellow -->
            </div>
            </div>
        `;

        this._root = root;
        this._buyBtn = root.querySelector('.card__buy');
        this._buyForm = root.querySelector('.card__buy-count-form');
        this._countInput = root.querySelector('.card__count-value input');
        this._addButton = root.querySelector('.card__count-add');
        this._decButton = root.querySelector('.card__count-back');
        this._favorEl = root.querySelector('.card__favorite');
        this._favorIcon = this._favorEl.querySelector('.icon');

        if (this._eventHandlers.buy) {
            this._buyBtn.addEventListener('click', this._eventHandlers.buy.bind(null, this));
            this._addButton.addEventListener('click', this._eventHandlers.buy.bind(null, this));
        }

        if (this._eventHandlers.decrease) {
            this._decButton.addEventListener('click', this._eventHandlers.decrease.bind(null, this));
        }

        if (this._eventHandlers.togleFavorite) {
            this._favorEl.addEventListener('click', this._eventHandlers.togleFavorite.bind(null, this));
        }
    }

    render() {
        if (this._buyed) {
            this._root.classList.add('buyed');
            this._buyBtn.hidden = true;
            this._buyForm.hidden = false;
            this._countInput.value = this._buyed;
        } else {
            this._root.classList.remove('buyed');
            this._buyBtn.hidden = false;
            this._buyForm.hidden = true;
        }

        if (this._favorite) {
            this._favorIcon.classList.remove('grey');
            this._favorIcon.classList.add('yellow');
        } else {
            this._favorIcon.classList.add('grey');
            this._favorIcon.classList.remove('yellow');
        }

        return this._root;
    }
}
