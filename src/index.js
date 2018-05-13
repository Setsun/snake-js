// @flow

type Position = {
  x: number,
  y: number,
};

const generateGrid = (size: number): Array<Array<Position>> => {
  return new Array(size).fill(
    new Array(size).fill(0),
  );
};

const generateSnake = (position: Position): Array<Position> => {
  return [position];
};

const generateApple = (position: Position): Position => {
  return position;
};

const initializeKeyEvents = () => {
};

const initializeInterval = () => {
  setInterval(() => {

  }, 1000);
};

const render = (grid, snake) => {
  const rootEl = document.getElementById('root');
  let gridEl = document.createElement('div');
  gridEl.classList.add('grid');

  for (let row of grid) {
    let rowEl = document.createElement('div');
    rowEl.classList.add('row');

    for (let position of row) {
      let cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      rowEl.appendChild(cellEl);
    }

    gridEl.appendChild(rowEl);
  }

  rootEl && rootEl.appendChild(gridEl);
};

console.log('hello world');

render(generateGrid(10));
