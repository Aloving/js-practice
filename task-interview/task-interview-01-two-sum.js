// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 1: Two Sum (Базовый-средний уровень, собеседование)
 *
 * Напишите функцию, которая принимает массив чисел и целевую сумму
 * и возвращает индексы двух элементов, сумма которых равна target.
 *
 * Требования:
 * - Вернуть массив из двух индексов [i, j] (i < j) или null, если пары нет
 * - Использовать один проход по массиву (O(n))
 * - Не изменять исходный массив
 *
 * Примеры:
 * findTwoSumIndices([2, 7, 11, 15], 9) => [0, 1]
 * findTwoSumIndices([3, 2, 4], 6) => [1, 2]
 * findTwoSumIndices([3, 3], 6) => [0, 1]
 */

function findTwoSumIndicesByReduce(numbers = [], target) {
  const { cursor, done } = numbers.reduce(
    (acc, cur, currentIndex, array) => {
      const resultOfTwo = cur + array[currentIndex + 1];

      if (acc.done) {
        return acc;
      }

      if (resultOfTwo === target) {
        return {
          cursor: currentIndex,
          done: true,
        };
      }

      return {
        cursor: currentIndex,
        done: false,
      };
    },
    {
      cursor: 0,
      done: false,
    }
  );

  return done ? [cursor, cursor + 1] : null;
}

// Работа со структурой по ходу итерации
function findTwoSumIndicesRecursively(numbers = [], target) {
  const firstIndex = numbers.findIndex((value) => value !== undefined);
  const a = numbers[firstIndex];
  const b = numbers[firstIndex + 1];

  if (a && b) {
    return a + b === target
      ? [firstIndex, firstIndex + 1]
      : findTwoSumIndices(
          [
            ...numbers.slice(0, firstIndex),
            undefined,
            ...numbers.slice(firstIndex + 1),
          ],
          target
        );
  }

  return null;
}

function findTwoSumIndices(numbers = [], target) {
  for (let i = 0; i <= numbers.length - 1; i++) {
    const a = numbers[i];
    const b = numbers[i + 1];

    if (!a || !b) {
      return null;
    }

    if (a + b === target) {
      return [i, i + 1];
    }
  }
}

// Тесты для проверки
console.log(
  "Тест 1:",
  JSON.stringify(findTwoSumIndices([2, 7, 11, 15], 9)) ===
    JSON.stringify([0, 1])
);
console.log(
  "Тест 2:",
  JSON.stringify(findTwoSumIndices([3, 2, 4], 6)) === JSON.stringify([1, 2])
);
console.log(
  "Тест 3:",
  JSON.stringify(findTwoSumIndices([3, 3], 6)) === JSON.stringify([0, 1])
);
console.log("Тест 4:", findTwoSumIndices([1, 2, 3], 10) === null);

module.exports = { findTwoSumIndices };
