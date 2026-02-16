// @no-ai-suggestions
// @disable-autocomplete
const { groupBy } = require('./task-interview-05-group-by.js');

describe('Task Interview 5: groupBy', () => {
  test('группирует по строковому ключу', () => {
    const items = [
      { type: 'a', n: 1 },
      { type: 'b', n: 2 },
      { type: 'a', n: 3 },
    ];
    expect(groupBy(items, (x) => x.type)).toEqual({
      a: [{ type: 'a', n: 1 }, { type: 'a', n: 3 }],
      b: [{ type: 'b', n: 2 }],
    });
  });

  test('группирует по числовому ключу (чётность)', () => {
    const items = [1, 2, 3, 4, 5];
    const result = groupBy(items, (x) => (x % 2 === 0 ? 'even' : 'odd'));
    expect(result.odd).toEqual([1, 3, 5]);
    expect(result.even).toEqual([2, 4]);
  });

  test('один элемент — одна группа', () => {
    expect(groupBy([42], (x) => x)).toEqual({ 42: [42] });
  });

  test('пустой массив — пустой объект', () => {
    expect(groupBy([], (x) => x)).toEqual({});
  });

  test('не изменяет исходный массив', () => {
    const input = [{ id: 1 }, { id: 2 }];
    const copy = input.map((x) => ({ ...x }));
    groupBy(input, (x) => x.id);
    expect(input).toEqual(copy);
  });
});
