// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 19: Продвинутое использование for и асинхронные итерируемые объекты (Средний-продвинутый уровень)
 *
 * Реализуйте функции, используя разные формы цикла for и работая с синхронными/асинхронными итерируемыми объектами:
 *
 * 1. collectWithForOf(iterable) - используя только цикл for...of, собрать все значения
 *    из итерируемого объекта (массив, Set, результат генератора и т.д.) в массив и вернуть его.
 *    Не использовать spread (...iterable) или Array.from.
 *
 * 2. ownEnumerableKeysWithForIn(obj) - используя цикл for...in и проверку
 *    Object.prototype.hasOwnProperty.call(obj, key), вернуть массив только собственных
 *    перечислимых ключей объекта obj.
 *
 * 3. collectWithForAwaitOf(asyncIterable) - асинхронная функция: используя цикл for await...of,
 *    собрать все значения из асинхронного итерируемого объекта в массив и вернуть его (Promise<Array>).
 *
 * 4. createAsyncIterableFromPromises(promises) - принять массив промисов и вернуть объект,
 *    по которому можно итерироваться через for await...of. При каждой итерации должен
 *    отдаваться результат очередного промиса (в порядке массива). Объект должен реализовать
 *    [Symbol.asyncIterator].
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

function collectWithForOf(iterable) {
  const result = [];
  for (const item of iterable) {
    result.push(item);
  }

  return result;
}

/*
 * 2. ownEnumerableKeysWithForIn(obj) - используя цикл for...in и проверку
 *    Object.prototype.hasOwnProperty.call(obj, key), вернуть массив только собственных
 *    перечислимых ключей объекта obj.
 */
function ownEnumerableKeysWithForIn(obj) {
  const keys = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keys.push(key);
    }
  }

  return keys;
}

/*
 * 3. collectWithForAwaitOf(asyncIterable) - асинхронная функция: используя цикл for await...of,
 *    собрать все значения из асинхронного итерируемого объекта в массив и вернуть его (Promise<Array>).
 */
async function collectWithForAwaitOf(asyncIterable) {
  const result = [];
  for await (const item of asyncIterable) {
    result.push(item);
  }

  return result;
}

/*
 * 4. createAsyncIterableFromPromises(promises) - принять массив промисов и вернуть объект,
 *    по которому можно итерироваться через for await...of. При каждой итерации должен
 *    отдаваться результат очередного промиса (в порядке массива). Объект должен реализовать
 *    [Symbol.asyncIterator].
 */
function createAsyncIterableFromPromises(promises) {
  return {
    [Symbol.asyncIterator]() {
      let index = 0;

      // 2. Возвращаем ИТЕРАТОР
      return {
        next: async () => {
          if (index < promises.length) {
            const promise = promises[index++];
            const value = await promise;

            return { value, done: false };
          }

          return { value: undefined, done: true };
        },
      };
    },
  };
}

module.exports = {
  collectWithForOf,
  ownEnumerableKeysWithForIn,
  collectWithForAwaitOf,
  createAsyncIterableFromPromises,
};
