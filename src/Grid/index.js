const generateSnake = (position: Position): Array<Position> => {
  return [position];
};

const generateApple = (position: Position): Position => {
  return position;
};

class Grid {
  constructor(size) {
    this.size = size;
    this.grid = new Array(size).fill(
      new Array(size).fill(0),
    );
    this.snake = generateSnake({
      x: Math.floor(size / 2),
      y: Math.floor(size / 2),
    });
    this.apple = generateApple({
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
    });
  }

  initializeUpdateInterval() {
    setInterval(() => {
      const [ head ] = this.snake;
      const nextPosition = { x: head.x + 1, y: head.y };
      this.snake[0] = nextPosition;
      this.render();
    }, 500);
  }

  render() {
    const rootEl = document.getElementById('root');
    rootEl.innerHTML = '';

    const gridEl = document.createElement('div');
    gridEl.classList.add('grid');

    for (let row of this.grid) {
      let rowEl = document.createElement('div');
      rowEl.classList.add('row');

      for (let position of row) {
        let cellEl = document.createElement('div');
        cellEl.classList.add('cell');
        rowEl.appendChild(cellEl);
      }

      gridEl.appendChild(rowEl);
    }

    for (let position of this.snake) {
      const snakeCell = gridEl
        .childNodes[position.x]
        .childNodes[position.y];
      snakeCell && snakeCell.classList.add('snake');
    }

    const appleCell = gridEl
      .childNodes[this.apple.x]
      .childNodes[this.apple.y];
    appleCell && appleCell.classList.add('apple');

    rootEl && rootEl.appendChild(gridEl);
  }

  start() {
    this.render();
    this.initializeUpdateInterval();
  }
}

export default Grid;
