// @no-ai-suggestions
// @disable-autocomplete
/*
 * ЗАДАЧА 4: Разбиение массива на чанки (TypeScript, базовый-средний уровень, собеседование)
 *
 * Напишите generic функцию, которая разбивает массив на подмассивы
 * заданного размера.
 *
 * Требования:
 * - Вернуть пустой массив, если size <= 0
 * - Последний чанк может быть меньше size
 * - Не изменять исходный массив
 */

export const chunkArray = <T>(items: T[], size: number): T[][] => {
  if (size <= 0) return [];

  return items.reduce((acc, cur, index, array) => {
    if (acc[0]) {
      const cursorArr = acc[acc.length - 1];

      if (cursorArr.length === size) {
        return [...acc, [cur]];
      }

      cursorArr.push(cur);

      return acc;
    }

    return [[cur]];
  }, [] as T[][]);
};
