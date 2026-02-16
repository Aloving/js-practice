// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 5: groupBy (Средний уровень, собеседование)
 *
 * Напишите функцию, которая группирует элементы массива по ключу,
 * возвращаемому переданной функцией.
 *
 * Требования:
 * - groupBy(items, keyFn) — keyFn(item) возвращает ключ (string | number | symbol)
 * - Результат: объект, где ключ — результат keyFn, значение — массив элементов
 * - Сохранять порядок первых вхождений ключей
 * - Не изменять исходный массив и элементы
 *
 * Примеры:
 * groupBy([{ type: 'a', n: 1 }, { type: 'b', n: 2 }, { type: 'a', n: 3 }], x => x.type)
 * => { a: [{ type: 'a', n: 1 }, { type: 'a', n: 3 }], b: [{ type: 'b', n: 2 }] }
 * groupBy([1, 2, 3, 4, 5], x => x % 2 === 0 ? 'even' : 'odd')
 * => { odd: [1, 3, 5], even: [2, 4] }
 */

function groupBy(items, keyFn) {
  return items.reduce((acc, cur) => {
    const key = keyFn(cur);

    if (acc[key]) {
      return {
        ...acc,
        [key]: [...acc[key], cur],
      };
    }

    return {
      ...acc,
      [key]: [cur],
    };
  }, {});
}

module.exports = { groupBy };
