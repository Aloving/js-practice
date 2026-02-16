// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 6: flattenDeep (Средний уровень, собеседование)
 *
 * Напишите функцию, которая рекурсивно «разворачивает» вложенные массивы
 * на один уровень (до примитивов/не-массивов).
 *
 * Требования:
 * - flattenDeep(arr) — один плоский массив в порядке обхода «слева направо»
 * - Не считать аргументы типа «array-like» (например arguments) массивами,
 *   если не использовать Array.isArray
 * - Не изменять исходный массив (создавать новый результат)
 *
 * Примеры:
 * flattenDeep([1, [2, [3, [4]], 5]]) => [1, 2, 3, 4, 5]
 * flattenDeep([1, 2, 3]) => [1, 2, 3]
 * flattenDeep([[[]]]) => []
 */

function flattenDeep(arr) {
  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return [...acc, ...flattenDeep(cur)];
    } else {
      return [...acc, cur];
    }
  }, []);
}

module.exports = { flattenDeep };
