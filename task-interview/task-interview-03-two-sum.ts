// @no-ai-suggestions
// @disable-autocomplete
/*
 * ЗАДАЧА 3: Two Sum (TypeScript, базовый-средний уровень, собеседование)
 *
 * Реализуйте функцию, которая принимает массив чисел и целевую сумму
 * и возвращает индексы двух элементов, сумма которых равна target.
 *
 * Требования:
 * - Вернуть кортеж [i, j] (i < j) или null, если пары нет
 * - Использовать один проход по массиву (O(n))
 * - Не изменять исходный массив
 */

export const findTwoSumIndices = (
  numbers: number[],
  target: number
): [number, number] | null => {
  for (let i = 0; i < numbers.length - 1; i++) {
    const a = numbers[i];
    const b = numbers[i + 1];
    if (a || b) {
      if (a + b === target) {
        return [i, i + 1];
      }

      continue;
    }

    return null;
  }

  return null;
  // TODO: реализуйте
  // throw new Error("Not implemented");
};
