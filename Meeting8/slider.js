class Slider {
    constructor() {
        this._currentSlide = 0;
        this._page = 1;
        this._lastPage = false;
        this._loading = false;

        const { countVisible, shiftItem } = this.getVisibleParams();

        this._countVisible = countVisible;
        this._shiftItem = shiftItem;

        this._root = document.querySelector('.slider');
        this._body = document.querySelector('.slider__wrapper');

        if (!this._body) {
            this.appendLoader();
            this.createBody();
            this._slides = [];
            this.fetchData();
        } else {
            this._slides = this._body.querySelectorAll('.slider__item');
        }


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

    createBody() {
        this._body = document.createElement('ul');
        this._body.className = 'slider__wrapper';

        this._root.append(this._body);
    }

    getNextPage() {
        if (this._lastPage || this._loading) {
            return ;
        }

        this._page++;
        this.fetchData();
    }

    delay() {
        return new Promise(resolve => setTimeout(resolve, 5000));
    }

    fetchData() {
        if (this._loading) {
            return ;
        }

        this.appendLoader();
        this._loading = true;

        return this.delay().then(() => fetch(`https://5d9969125641430014051850.mockapi.io/news?page=${this._page}&limit=10`))
            .then(response => response.json())
            .then(data => {
                this.hideLoader();
                this._loading = false;
                this.appendData(data);

                if (data.length === 0) {
                    this._lastPage = true;
                }
            });
    }

    appendData(data) {
        const newSlides = data.map(slide => this.createSlide(slide));
        this._body.append(...newSlides);

        // this._slides.concat(newSlides);
        this._slides = this._body.querySelectorAll('.slider__item');
    }

    createSlide({ image, category, title, name, views }) {
        const li = document.createElement('li');

        li.className = 'slider__item';
        li.innerHTML = `
            <div class="slider__content">
                <div class="slider__content-header">
                    <img class="slider__content-img" src="${image}" alt="">
                    <span class="slider__content-section">${category}</span>
                </div>
                <h2 class="slider__content-title">${title}</h2>
                <div class="slider__content-footer">
                    <div class="slider__content-avatar">
                        <img class="slider__content-photo" src="https://source.unsplash.com/40x40/?face" alt="">
                    </div>
                    <span class="slider__content-author">${name}</span>
                    <svg class="slider__content-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path fill="currentColor"
                            d="M10 5C6.947 5 4.16 6.747 2.12 9.61a.726.726 0 0 0 0 .799C4.16 13.253 6.947 15 10 15s5.84-1.747 7.88-4.61a.726.726 0 0 0 0-.799C15.84 6.747 13.053 5 10 5zm.213 8.513c-2.023.13-3.71-1.617-3.585-3.755.106-1.747 1.473-3.178 3.141-3.29 2.024-.13 3.71 1.618 3.585 3.755-.106 1.766-1.455 3.178-3.141 3.29zm-.089-1.617c-1.1.074-1.988-.874-1.934-2.026.053-.948.78-1.71 1.686-1.766 1.1-.074 1.988.874 1.934 2.026-.053.93-.798 1.71-1.686 1.766z">
                        </path>
                    </svg>
                    <span class="slider__content-views">${views}</span>
                </div>
            </div>
        `;

        return li;
    }

    hideLoader() {
        if (this._loader) {
            this._loader.remove();
        }
    }

    appendLoader() {
        if (!this._loader) {
            this._loader = document.createElement('div');
            this._loader.className = 'slider__loading';
            this._loader.innerText = 'Loading...';
        }

        this._root.append(this._loader);
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
        if (this._currentSlide > this._slides.length - 2*this._countVisible) {
            this.getNextPage();
        }

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
