// @no-ai-suggestions
// @disable-autocomplete
const {
  shortestPathInGrid,
  numIslands,
  bfsLevelOrder,
  hasPath,
} = require('./task-27-algorithms-graphs');

describe('Task 27: Алгоритмы — графы и BFS', () => {
  test('экспортирует все функции', () => {
    expect(typeof shortestPathInGrid).toBe('function');
    expect(typeof numIslands).toBe('function');
    expect(typeof bfsLevelOrder).toBe('function');
    expect(typeof hasPath).toBe('function');
  });

  describe('shortestPathInGrid', () => {
    test('длина кратчайшего пути', () => {
      const grid = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];
      expect(shortestPathInGrid(grid, [0, 0], [2, 2])).toBe(4);
    });
    test('нет пути → -1', () => {
      const grid = [[0, 1], [1, 0]];
      expect(shortestPathInGrid(grid, [0, 0], [1, 1])).toBe(-1);
    });
  });

  describe('numIslands', () => {
    test('количество островов', () => {
      const grid = [
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1'],
      ];
      expect(numIslands(grid)).toBe(3);
    });
    test('пустая сетка → 0', () => expect(numIslands([])).toBe(0));
  });

  describe('bfsLevelOrder', () => {
    test('порядок BFS', () => {
      const adj = { 1: [2, 3], 2: [4], 3: [], 4: [] };
      expect(bfsLevelOrder(adj, 1)).toEqual([1, 2, 3, 4]);
    });
  });

  describe('hasPath', () => {
    test('путь есть', () => {
      const adj = { a: ['b'], b: ['c'], c: [] };
      expect(hasPath(adj, 'a', 'c')).toBe(true);
    });
    test('пути нет', () => {
      const adj = { a: ['b'], b: [], c: [] };
      expect(hasPath(adj, 'a', 'c')).toBe(false);
    });
  });
});
