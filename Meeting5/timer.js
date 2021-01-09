function Timer(props = {}) {
    // this = {}

    this._props = props;
    this._state = {
        startTime: null,
        started: false,
        pause: false,
        timeShift: 0,
    };

    // return this;
}

Timer.prototype.setState = function(addedState) {
    if (addedState) {
        this._state = {
            ...this._state,
            ...addedState
        };

        this.render();
    }
};

Timer.prototype.getCurrentTime = function() {
    const {startTime, timeShift} = this._state;

    if (!startTime) {
        return timeShift;
    }

    return Date.now() - startTime + timeShift;
};

Timer.prototype.getTimeAsString = function() {
    const currentTime = Math.round(this.getCurrentTime() / 1000);
    const ss = currentTime % 60;
    const mm = Math.floor(currentTime / 60);

    return `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
};

Timer.prototype.start = function() {
    this.setState({
        startTime: Date.now(),
        started: true,
        pause: false,
    });

    this._upadateIntervalId = setInterval(this.render.bind(this), 1000);
};

Timer.prototype.pause = function() {
    if (this._state.started && !this._state.pause) {
        this.setState({
            startTime: null,
            pause: true,
            timeShift: this.getCurrentTime()
        });

        clearInterval(this._upadateIntervalId);
    }
};

Timer.prototype.reset = function() {
    this.setState({
        startTime: null,
        started: true,
        pause: false,
        timeShift: 0
    });

    clearInterval(this._upadateIntervalId);
};

Timer.prototype.render = function() {
    if (this._props.container) {
        this._props.container.innerText = this.getTimeAsString();
    }
};
