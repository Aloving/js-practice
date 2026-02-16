// @no-ai-suggestions
// @disable-autocomplete
const { flattenDeep } = require('./task-interview-06-flatten-deep.js');

describe('Task Interview 6: flattenDeep', () => {
  test('разворачивает вложенные массивы', () => {
    expect(flattenDeep([1, [2, [3, [4]], 5]])).toEqual([1, 2, 3, 4, 5]);
  });

  test('плоский массив без изменений', () => {
    expect(flattenDeep([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('вложенные пустые массивы', () => {
    expect(flattenDeep([[[]]])).toEqual([]);
  });

  test('смешанная вложенность', () => {
    expect(flattenDeep([1, [2, 3], 4, [5, [6]]])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('не изменяет исходный массив', () => {
    const input = [1, [2]];
    flattenDeep(input);
    expect(input).toEqual([1, [2]]);
  });
});
