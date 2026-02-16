// @no-ai-suggestions
// @disable-autocomplete
import { mergeIntervals } from './task-interview-08-merge-intervals';

describe('Task Interview 8: mergeIntervals', () => {
  test('объединяет пересекающиеся интервалы', () => {
    expect(
      mergeIntervals([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ])
    ).toEqual([
      [1, 6],
      [8, 10],
      [15, 18],
    ]);
  });

  test('соприкасающиеся по границе объединяются', () => {
    expect(
      mergeIntervals([
        [1, 4],
        [4, 5],
      ])
    ).toEqual([[1, 5]]);
  });

  test('один интервал без изменений', () => {
    expect(mergeIntervals([[1, 5]])).toEqual([[1, 5]]);
  });

  test('пустой массив', () => {
    expect(mergeIntervals([])).toEqual([]);
  });

  test('не изменяет исходный массив', () => {
    const input: [number, number][] = [
      [1, 3],
      [2, 4],
    ];
    const copy = input.map((x) => [...x] as [number, number]);
    mergeIntervals(input);
    expect(input).toEqual(copy);
  });
});
