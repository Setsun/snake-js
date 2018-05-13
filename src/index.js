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

console.log('hello world');
