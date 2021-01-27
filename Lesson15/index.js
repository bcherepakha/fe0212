const startBtn = document.querySelector('.start-animation');
const squareEl = document.querySelector('.square');
const circleEl = document.querySelector('.circle');

startBtn.addEventListener('click', () => {
    firstAnimation(secondAnimation, thirdAnimation);
});

function firstAnimation(secondAnimation, thirdAnimation) {
    squareEl.addEventListener('transitionend', secondAnimation(thirdAnimation));

    squareEl.classList.add('square--scaled');
}

function secondAnimation(thirdAnimation) {
    const caller = function(e) {
        if (e.propertyName === 'transform') {
            squareEl.removeEventListener('transitionend', caller);
            squareEl.addEventListener('transitionend', thirdAnimation);

            squareEl.classList.add('square--rotated');
        }
    };

    return caller;
}

function thirdAnimation(e) {
    if (e.propertyName === 'transform') {
        squareEl.removeEventListener('transitionend', thirdAnimation);

        circleEl.classList.add('circle--shown');
    }
}
