// @no-ai-suggestions
// @disable-autocomplete
const { DisjointSet } = require('./task-30-data-structures-union-find');

describe('Task 30: Disjoint Set (Union-Find)', () => {
  test('экспортирует DisjointSet', () => {
    expect(typeof DisjointSet).toBe('function');
  });

  test('makeSet и find: элемент — представитель самого себя', () => {
    const ds = new DisjointSet();
    ds.makeSet('a');
    expect(ds.find('a')).toBe('a');
  });

  test('union и areConnected: объединённые элементы связаны', () => {
    const ds = new DisjointSet();
    ds.makeSet('a');
    ds.makeSet('b');
    ds.union('a', 'b');
    expect(ds.areConnected('a', 'b')).toBe(true);
  });

  test('необъединённые элементы не связаны', () => {
    const ds = new DisjointSet();
    ds.makeSet('a');
    ds.makeSet('b');
    expect(ds.areConnected('a', 'b')).toBe(false);
  });

  test('транзитивность: a-b, b-c => a и c связаны', () => {
    const ds = new DisjointSet();
    ds.makeSet('a');
    ds.makeSet('b');
    ds.makeSet('c');
    ds.union('a', 'b');
    ds.union('b', 'c');
    expect(ds.areConnected('a', 'c')).toBe(true);
  });
});
