const { createElement } = window['lib-dom'];
const EMPTY_CELL = '';
const WIN_BOARD = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, EMPTY_CELL];
const ADDITIONAL_WIN_BOARD = [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, EMPTY_CELL];
const ITEM_CAN_MOVE = 'board__item--can-move';
const ITEM_CANT_MOVE = 'board__item--cant-move';

function Game15(props) {
    this._props = Object.freeze(props);

    this._move = false;
    this._state = {
        board: [...WIN_BOARD].sort(() => Math.random() - .6),
        steps: 0
    };

    this._props.boardEl.addEventListener('transitionend', () => {
        this._move = false;

        if (this._state.win) {
            alert('You win');
        }
    });

    this._stepsCounter = createElement('div', { className: 'board__steps-counter' });

    this._createItems();
    this._clearBoard();

    this._props.boardEl.append(this._stepsCounter);

    this.render();
}

Game15.prototype.setState = function (newState) {
    this._state = {
        ...this._state,
        ...newState
    };

    this.render();
};

Game15.prototype._createItem = function(num) {
    const item = createElement('div', { className: 'board__item', innerText: num });

    item.addEventListener('click', (event) => this.move(num, event));

    return item;
};

Game15.prototype._createItems = function() {
    this._items = WIN_BOARD
        .filter(el => el !== EMPTY_CELL)
        .map(num => this._createItem(num));
};

Game15.prototype._clearBoard = function() {
    this._props.boardEl.innerText = '';
    this._props.boardEl.append(...this._items);
};

Game15.prototype.move = function(num, event) {
    if (this._move) {
        return ;
    }

    const { board, steps } = this._state;
    const numPosition = board.findIndex(item => item === num);
    const emptyPosition = board.findIndex(item => item === EMPTY_CELL);
    const itemEl = this._items[num - 1];
    const siblingsIdx = [
        emptyPosition > 3 ? emptyPosition - 4 : null,
        emptyPosition < 12 ? emptyPosition + 4 : null,
        emptyPosition % 4 !== 0 ? emptyPosition - 1 : null,
        emptyPosition % 4 !== 3 ? emptyPosition + 1 : null,
    ];
    const canItemMove = siblingsIdx.includes(numPosition);
    const itemElClass = canItemMove ? ITEM_CAN_MOVE : ITEM_CANT_MOVE;
    const { layerX, layerY } = event;

    if (!itemEl.classList.contains(itemElClass)) {
        itemEl.style.setProperty('--layerX', `${layerX}px`);
        itemEl.style.setProperty('--layerY', `${layerY}px`);
        itemEl.addEventListener('animationend', () => itemEl.classList.remove(itemElClass), { once: true });
        itemEl.classList.add(itemElClass);
    }

    if (canItemMove) {
        const newBoard = [...board];
        const win = this.isWin(newBoard);

        newBoard[emptyPosition] = num;
        newBoard[numPosition] = EMPTY_CELL;

        this.setState({ board: newBoard, win, steps: steps + 1 });
        this._move = true;
    }
};

Game15.prototype.isWin = function (board) {
    const boardAsString = board.join('');

    return boardAsString === WIN_BOARD.join('') || boardAsString === ADDITIONAL_WIN_BOARD.join('');
};

Game15.prototype.render = function() {
    this._state.board.forEach((num, idx) => {
        if (num !== EMPTY_CELL) {
            const item = this._items[num - 1];
            const col = idx % 4;
            const row = Math.floor(idx / 4);

            item.style.left = `${col * 25}%`;
            item.style.top = `${row * 25}%`;
        }
    });

    this._stepsCounter.innerText = `шаги: ${this._state.steps}`;
};

const game = new Game15({
    boardEl: document.querySelector('.board')
});

console.log(game);
