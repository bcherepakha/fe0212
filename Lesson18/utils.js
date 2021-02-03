export function getRandomPrice() {
    return parseFloat((20 + 100*Math.random()).toFixed(2));
}

export function stingifyParams(params) {
    return Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
}

export function callOnceAfter(fn, time) {
    let lastCallTime = 0;
    let timeoutId = null;

    return function() {
        const currentTime = Date.now();

        console.log({ time, currentTime, timeoutId, lastCallTime, if: currentTime - lastCallTime < time });
        if (timeoutId && currentTime - lastCallTime < time ) {
            clearTimeout(timeoutId);
        }

        lastCallTime = currentTime;
        timeoutId = setTimeout(() => {
            lastCallTime = 0;
            timeoutId = null;

            fn();
        }, time);
    };
}
