// @no-ai-suggestions
// @disable-autocomplete
const {
  collectWithForOf,
  ownEnumerableKeysWithForIn,
  collectWithForAwaitOf,
  createAsyncIterableFromPromises,
} = require('./task-19-advanced-for');

describe('Task 19: Продвинутое использование for и асинхронные итерируемые объекты', () => {
  test('экспортирует все необходимые функции', () => {
    expect(typeof collectWithForOf).toBe('function');
    expect(typeof ownEnumerableKeysWithForIn).toBe('function');
    expect(typeof collectWithForAwaitOf).toBe('function');
    expect(typeof createAsyncIterableFromPromises).toBe('function');
  });

  describe('collectWithForOf', () => {
    test('собирает элементы массива', () => {
      expect(collectWithForOf([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('собирает элементы Set', () => {
      expect(collectWithForOf(new Set([4, 5, 6]))).toEqual([4, 5, 6]);
    });

    test('собирает значения из генератора', () => {
      function* gen() {
        yield 1;
        yield 2;
        yield 3;
      }
      expect(collectWithForOf(gen())).toEqual([1, 2, 3]);
    });

    test('пустой итерируемый даёт пустой массив', () => {
      expect(collectWithForOf([])).toEqual([]);
      expect(collectWithForOf(new Set())).toEqual([]);
    });

    test('работает со строкой (итерируемой по символам)', () => {
      expect(collectWithForOf('ab')).toEqual(['a', 'b']);
    });
  });

  describe('ownEnumerableKeysWithForIn', () => {
    test('возвращает собственные перечислимые ключи', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const keys = ownEnumerableKeysWithForIn(obj);
      expect(keys.sort()).toEqual(['a', 'b', 'c']);
    });

    test('не включает унаследованные ключи', () => {
      const parent = { inherited: true };
      const obj = Object.create(parent);
      obj.own = 1;
      const keys = ownEnumerableKeysWithForIn(obj);
      expect(keys).toEqual(['own']);
    });

    test('пустой объект даёт пустой массив', () => {
      expect(ownEnumerableKeysWithForIn({})).toEqual([]);
    });

    test('не включает неперечислимые собственные свойства', () => {
      const obj = { a: 1 };
      Object.defineProperty(obj, 'hidden', { value: 2, enumerable: false });
      const keys = ownEnumerableKeysWithForIn(obj);
      expect(keys).toEqual(['a']);
    });
  });

  describe('collectWithForAwaitOf', () => {
    test('собирает значения из асинхронного генератора', async () => {
      async function* asyncGen() {
        yield 1;
        yield 2;
        yield 3;
      }
      const result = await collectWithForAwaitOf(asyncGen());
      expect(result).toEqual([1, 2, 3]);
    });

    test('ожидает промисы из async iterable', async () => {
      async function* asyncGen() {
        yield Promise.resolve('a');
        yield Promise.resolve('b');
      }
      const result = await collectWithForAwaitOf(asyncGen());
      expect(result).toEqual(['a', 'b']);
    });

    test('пустой async iterable даёт пустой массив', async () => {
      async function* empty() {}
      const result = await collectWithForAwaitOf(empty());
      expect(result).toEqual([]);
    });

    test('работает с объектом из createAsyncIterableFromPromises', async () => {
      const iterable = createAsyncIterableFromPromises([
        Promise.resolve(10),
        Promise.resolve(20),
      ]);
      const result = await collectWithForAwaitOf(iterable);
      expect(result).toEqual([10, 20]);
    });
  });

  describe('createAsyncIterableFromPromises', () => {
    test('возвращает объект с Symbol.asyncIterator', () => {
      const iterable = createAsyncIterableFromPromises([]);
      expect(typeof iterable[Symbol.asyncIterator]).toBe('function');
    });

    test('for await...of отдаёт результаты промисов по порядку', async () => {
      const iterable = createAsyncIterableFromPromises([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
      ]);
      const result = [];
      for await (const value of iterable) {
        result.push(value);
      }
      expect(result).toEqual([1, 2, 3]);
    });

    test('корректно обрабатывает задержанные промисы', async () => {
      const delay = (ms, val) => new Promise((r) => setTimeout(() => r(val), ms));
      const iterable = createAsyncIterableFromPromises([
        delay(30, 'first'),
        delay(10, 'second'),
        delay(20, 'third'),
      ]);
      const result = [];
      for await (const value of iterable) {
        result.push(value);
      }
      expect(result).toEqual(['first', 'second', 'third']);
    });

    test('пустой массив промисов — пустая итерация', async () => {
      const iterable = createAsyncIterableFromPromises([]);
      const result = [];
      for await (const value of iterable) {
        result.push(value);
      }
      expect(result).toEqual([]);
    });

    test('при ошибке в промисах итерация пробрасывает ошибку', async () => {
      const failingPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('fail')), 10)
      );
      const iterable = createAsyncIterableFromPromises([
        Promise.resolve(1),
        failingPromise,
      ]);
      const result = [];
      await expect(
        (async () => {
          for await (const value of iterable) {
            result.push(value);
          }
        })()
      ).rejects.toThrow('fail');
      expect(result).toEqual([1]);
    });
  });
});
