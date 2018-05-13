import Grid '../../Grid';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('Grid', () => {
  let grid;

  beforeEach(() => {
    grid = new Grid(10);
  })

  it('initializes the grid correctly', () => {
    expect(grid.size).toEqual(10);
  });

  it('initializes the snake correctly', () => {
    expect(grid.snake).toEqual(10);
  });

  it('initializes the apple correctly', () => {
    expect(grid.apple).toEqual({});
  });
});
