// @flow

import Grid from './Grid';

type Position = {
  x: number,
  y: number,
};

const initializeKeyEvents = () => {
};

const grid = new Grid(10);

grid.start();
