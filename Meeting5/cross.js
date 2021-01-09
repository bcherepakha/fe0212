function Cross(props = {}) {

    this._props = props;
    // eslint-disable-next-line no-undef
    this._fullGameTimer = new Timer({
        container: this._props.container.querySelector('.cross__timer--game')
    });
    this._boardEl = this._props.container.querySelector('.cross__board');
    this._actionsEl = {
        start: this._props.container.querySelector('.cross__action--start'),
        pause: this._props.container.querySelector('.cross__action--pause')
    };
    this._usersLabels = [Cross.X_CEll, Cross.O_CEll];
    this._users = {
        [Cross.X_CEll]: {
            name: Cross.X_CEll,
            // eslint-disable-next-line no-undef
            timer: new Timer({
                container: this._props.container.querySelector('.cross__timer--x')
            }),
            createEl: this._createXEl,
        },
        [Cross.O_CEll]: {
            name: Cross.O_CEll,
            // eslint-disable-next-line no-undef
            timer: new Timer({
                container: this._props.container.querySelector('.cross__timer--o')
            }),
            createEl: this._create0El,
        }
    };
    this._state = {
        board: new Array(9).fill(Cross.EMTY_CEll),
        currentUser: Cross.X_CEll
    };

    this._actionsEl.start.addEventListener('click', this.start.bind(this));
    this._boardEl.addEventListener('click', this._listenClickByBoard.bind(this));
}

Cross.EMTY_CEll = '';
Cross.X_CEll = 'x';
Cross.O_CEll = '0';

Cross.prototype.setState = function(addedState) {
    if (addedState) {
        this._state = {
            ...this._state,
            ...addedState
        };

        console.log( this._state );
    }
};

Cross.prototype._listenClickByBoard = function(e) {
    const cellEl = e.target.closest('.cross__board-item');
    const cellIdx = +cellEl.dataset.index;

    this.move(cellIdx);
};

Cross.prototype._fillEmptyBoard = function() {
    this._boardEl.innerText = '';
    this._boardItems = this._state.board.map((value, idx) => this._createBoardItemEl(idx));
    this._boardEl.append(
        ...this._boardItems
    );
};

Cross.prototype._createBoardItemEl = function(idx) {
    const el = document.createElement('div');

    el.className = 'cross__board-item';
    // el.setAttribute('data-index', idx.toString());
    el.dataset.index = idx.toString();

    return el;
};

Cross.prototype._createXEl = function() {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const line1El = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const line2El = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    svgEl.append(line1El, line2El);
    svgEl.setAttribute('viewBox', '0 0 80 80');

    line1El.setAttribute('class', 'x__line1');
    line1El.setAttribute('x1', '20');
    line1El.setAttribute('y1', '10');
    line1El.setAttribute('x2', '60');
    line1El.setAttribute('y2', '70');

    line2El.setAttribute('class', 'x__line2');
    line2El.setAttribute('x1', '60');
    line2El.setAttribute('y1', '10');
    line2El.setAttribute('x2', '20');
    line2El.setAttribute('y2', '70');

    svgEl.setAttribute('class', 'x cross__board-item-el');

    return svgEl;
};

Cross.prototype._create0El = function() {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const ellipseEl = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

    svgEl.append(ellipseEl);
    svgEl.setAttribute('viewBox', '0 0 80 80');

    svgEl.setAttribute('class', 'o cross__board-item-el');

    ellipseEl.setAttribute('cx', '40');
    ellipseEl.setAttribute('cy', '40');
    ellipseEl.setAttribute('rx', '20');
    ellipseEl.setAttribute('ry', '30');

    return svgEl;
};

Cross.prototype.start = function() {
    const { currentUser } = this._state;
    const currentUserTimer = this._users[currentUser].timer;

    this._fullGameTimer.reset();
    this._fullGameTimer.start();
    currentUserTimer.reset();
    currentUserTimer.start();

    this.setState({
        board: new Array(9).fill(Cross.EMTY_CEll),
        currentUser: Cross.X_CEll
    });

    this._fillEmptyBoard();
};

Cross.prototype.move = function(cellIdx) {
    if (this._state.board[cellIdx] !== Cross.EMTY_CEll) {
        console.error('can\'t move to ', cellIdx);

        return ;
    }

    const { currentUser, board } = this._state;
    const currentUserTimer = this._users[currentUser].timer;
    const nextUser = this._usersLabels.find(label => label !== currentUser);
    const nextUserTimer = this._users[nextUser].timer;
    const renderEl = this._users[currentUser].createEl;
    const svgEl = renderEl.call(this);

    currentUserTimer.pause();
    board[cellIdx] = currentUser;
    this._boardItems[cellIdx].append(svgEl);

    this.setState({
        board,
        currentUser: nextUser
    });

    nextUserTimer.start();
};
