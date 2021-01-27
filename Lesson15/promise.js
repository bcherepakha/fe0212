const startBtn = document.querySelector('.start-animation');
const clearBtn = document.querySelector('.clear-animation');
const squareEl = document.querySelector('.square');
const circleEl = document.querySelector('.circle');

startBtn.addEventListener('click', () => {
    startAnimation()
        .then(getRandomBeer)
        .then(beerData => {
            const img = document.createElement('img');

            console.log(beerData);
            img.src = beerData[0]['image_url'];

            document.body.append(img);
        })
        .catch(() => clearAnimation());
});

clearBtn.addEventListener('click', () => {
    clearAnimation();
});

async function startAnimation() {
    try {
        await firstAnimation();
        await secondAnimation();
        await thirdAnimation();
    } catch(ex) {
        clearAnimation();
    }
}

function clearAnimation() {
    squareEl.classList.remove('square--scaled');
    squareEl.classList.remove('square--rotated');
    circleEl.classList.remove('circle--shown');
}

function firstAnimation() {
    return new Promise(function(resolve, reject) {
        let count = 0;

        setTimeout(reject, 1000);

        function onTransitionEnd() {
            count++;

            if (count === 2) {
                squareEl.removeEventListener('transitionend', onTransitionEnd);
                resolve();
            }
        }

        squareEl.addEventListener('transitionend', onTransitionEnd);

        squareEl.classList.add('square--scaled');
    });
}

function secondAnimation() {
    return new Promise(function (resolve) {
        squareEl.addEventListener('transitionend', resolve, { once: true });

        squareEl.classList.add('square--rotated');
    });
}

function thirdAnimation() {
    return new Promise(function(resolve) {
        circleEl.addEventListener('transitionend', resolve, { once: true });

        circleEl.classList.add('circle--shown');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        Promise.all([
            firstAnimation(),
            secondAnimation(),
            thirdAnimation()
        ]).then(() => console.log('done')).catch(clearAnimation);
    }, 0);
});
