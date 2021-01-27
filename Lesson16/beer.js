// https://punkapi.com/documentation/v2

const getBeerForm = document.querySelector('.get-beer');
const beersList = document.querySelector('.beers');

getBeerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(getBeerForm);
    const params = [];

    formData.forEach((value, key) => {
        if (value) {
            params.push(`${key}=${value}`);
        }
    });

    showBeer(`https://api.punkapi.com/v2/beers?${params.join('&')}`);
});

// function showBeer(url) {
//     return fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const beersColl =data.map(createBeerCard);

//             beersList.innerText = '';
//             beersList.append(...beersColl);
//         });
// }

async function showBeer(url) {
    const response = await fetch(url);
    const data = await response.json();
    const beersColl =data.map(createBeerCard);

    beersList.innerText = '';
    beersList.append(...beersColl);
}

function createBeerCard({ image_url: imageUrl, name, description }) {
    const root = document.createElement('div');
    const title = document.createElement('div');
    const descriptionEl = document.createElement('div');

    root.className = 'beer';
    title.className = 'beer__title';
    descriptionEl.className = 'beer__description';

    root.append(title, descriptionEl);

    title.innerText = name;
    descriptionEl.innerText = description;

    if (imageUrl) {
        const img = document.createElement('img');

        img.className = 'beer__image';
        img.src = imageUrl;

        root.append(img);
    }

    return root;
}
