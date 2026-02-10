// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 2: Разбиение массива на чанки (Базовый-средний уровень, собеседование)
 *
 * Напишите функцию, которая разбивает массив на подмассивы заданного размера.
 *
 * Требования:
 * - Вернуть пустой массив, если size <= 0
 * - Последний чанк может быть меньше size
 * - Не изменять исходный массив
 *
 * Примеры:
 * chunkArray([1, 2, 3, 4, 5], 2) => [[1, 2], [3, 4], [5]]
 * chunkArray([1, 2, 3], 3) => [[1, 2, 3]]
 * chunkArray([1, 2, 3], 4) => [[1, 2, 3]]
 */

function chunkArray(items, size) {
  if (size <= 0) return [];

  const result = [];
  const chunksCount = Math.ceil(items.length / size);

  for (let i = 0; chunksCount > i; i++) {
    const intermediate = items.slice(i * size, i * size + size);

    result.push(intermediate);
  }

  return result;
}

function chunkArrayRecursively(
  items,
  size,
  result = [],
  intermediate = [],
  cursor = 0
) {
  if (size <= 0) {
    return [];
  }

  if (items.length <= cursor) {
    if (intermediate.length) {
      return [...result, intermediate];
    }
    return result;
  }

  if (intermediate.length === size) {
    return chunkArray(items, size, [...result, intermediate], [], cursor);
  }

  if (intermediate.length !== size) {
    const currentValue = items[cursor];
    intermediate.push(currentValue);

    return chunkArray(items, size, result, intermediate, cursor + 1);
  }
}

function chunkArrayByReduce(items, size) {
  if (0 >= size) return [];

  return items.reduce((acc, cur) => {
    // если есть первый элемент, говорит о том что проводилась итерация и массив
    // результата не пустой
    if (acc[0]) {
      // проверяем последний массив, является ли он полным?
      const lastCursorArr = acc[acc.length - 1];

      // когда массив полный мы создаем новый массив и пушим первый элемент
      if (lastCursorArr.length === size) {
        return [...acc, [cur]];
      }

      // Когда массив не полный, в него надо запушить элемент
      if (lastCursorArr.length !== size) {
        lastCursorArr.push(cur);

        return acc;
      }
    }

    // Иначе начинаем итерацию, пушим первый элемент в массив
    return [[cur]];
  }, []);
}

// Тесты для проверки
console.log(
  "Тест 1:",
  JSON.stringify(chunkArray([1, 2, 3, 4, 5], 2)) ===
    JSON.stringify([[1, 2], [3, 4], [5]])
);
console.log(
  "Тест 2:",
  JSON.stringify(chunkArray([1, 2, 3], 3)) === JSON.stringify([[1, 2, 3]])
);
console.log(
  "Тест 3:",
  JSON.stringify(chunkArray([1, 2, 3], 4)) === JSON.stringify([[1, 2, 3]])
);
console.log(
  "Тест 4:",
  JSON.stringify(chunkArray([1, 2, 3], 0)) === JSON.stringify([])
);

module.exports = { chunkArray };
