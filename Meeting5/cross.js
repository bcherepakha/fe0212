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
    // this._boardEl.addEventListener('click', this._listenClickByBoard.bind(this));
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

// Cross.prototype._listenClickByBoard = function(e) {
//     const cellEl = e.target.closest('.cross__board-item');
//     const cellIdx = +cellEl.dataset.index;

//     this.move(cellIdx);
// };

Cross.prototype._fillEmptyBoard = function() {
    this._boardEl.innerText = '';
    this._boardItems = this._state.board.map((value, idx) => this._createBoardItemEl(idx));
    this._boardEl.append(
        ...this._boardItems
    );
};

Cross.prototype._createItemClickListener = function(idx) {
    return () => {
        this.move(idx);
    };
};

Cross.prototype._createBoardItemEl = function(idx) {
    const el = document.createElement('div');

    el.className = 'cross__board-item';
    // el.setAttribute('data-index', idx.toString());
    el.dataset.index = idx.toString();

    el.addEventListener('click', this._createItemClickListener(idx));

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
    const currentUser = Cross.X_CEll;
    const currentUserTimer = this._users[currentUser].timer;
    const nextUserTimer = this._users[Cross.O_CEll].timer;

    this._fullGameTimer.reset();
    this._fullGameTimer.start();
    currentUserTimer.reset();
    currentUserTimer.start();
    nextUserTimer.reset();

    this.setState({
        board: new Array(9).fill(Cross.EMTY_CEll),
        currentUser: Cross.X_CEll
    });

    this._fillEmptyBoard();
};

Cross.prototype.isWin = function(board, checkedUser) {
    function ckeckItem(item) {
        return item.values.every(el => el === checkedUser);
    }

    for (let i = 0; i < 3; i++) {
        const row = {
            idx: i,
            type: 'row',
            values: [board[3*i + 0], board[3*i + 1], board[3*i + 2]],
            cells: [this._boardItems[3*i + 0], this._boardItems[3*i + 1], this._boardItems[3*i + 2]]
        };

        if (ckeckItem(row)) {
            return row;
        }

        const column = {
            idx: i,
            type: 'column',
            values: [board[i + 0], board[i + 3], board[i + 6]],
            cells: [this._boardItems[i + 0], this._boardItems[i + 3], this._boardItems[i + 6]]
        };

        if (ckeckItem(column)) {
            return column;
        }
    }

    return [{
        idx: 0,
        type: 'diagonal',
        values: [board[0], board[4], board[8]],
        cells: [this._boardItems[0], this._boardItems[4], this._boardItems[8]]
    },
    {
        idx: 1,
        type: 'diagonal',
        values: [board[2], board[4], board[6]],
        cells: [this._boardItems[2], this._boardItems[4], this._boardItems[6]]
    }].find(item => ckeckItem(item));
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

    const winItem = this.isWin(board, currentUser);

    this.setState({
        board,
        currentUser: nextUser
    });

    if (winItem) {
        this._fullGameTimer.pause();
        const wantNewGame = confirm(`Winner ${currentUser} by ${currentUserTimer.getTimeAsString()}. Do you want to start new game?`);

        winItem.cells.forEach((cell) => {
            cell.classList.add(`cross__board-item--${['win', winItem.type, winItem.type === 'diagonal' && winItem.idx].filter(el => el !== false).join('-')}`);
        });

        if (wantNewGame) {
            return this.start();
        }
    } else {
        nextUserTimer.start();
    }

};
