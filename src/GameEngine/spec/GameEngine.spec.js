import GameEngine from '../../GameEngine';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('GameEngine', () => {
  let engine;

  beforeEach(() => {
    engine = new GameEngine(10);
  })

  it('initializes correctly', () => {
    expect(engine.size).toEqual(10);
  });
});
