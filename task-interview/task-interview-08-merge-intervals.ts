// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 8: Merge Overlapping Intervals (TypeScript, средний-продвинутый, собеседование)
 *
 * Дан массив интервалов [start, end]. Объедините пересекающиеся/соприкасающиеся интервалы.
 *
 * Требования:
 * - Интервал задаётся кортежем [number, number] (start <= end)
 * - mergeIntervals(intervals): вернуть массив объединённых интервалов в порядке по start
 * - Не изменять исходный массив
 *
 * Примеры:
 * mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]) => [[1, 6], [8, 10], [15, 18]]
 * mergeIntervals([[1, 4], [4, 5]]) => [[1, 5]]
 */

export type Interval = [number, number];

export function mergeIntervals(intervals: Interval[] = []): Interval[] {
  const result = [] as Interval[];

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    const cursor = 
    const current = intervals[i];

     if (current[0] <= result[1]) {
      result[1] = Math.max()
     }
  }
}
