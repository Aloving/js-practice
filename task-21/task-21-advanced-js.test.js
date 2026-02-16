// @no-ai-suggestions
// @disable-autocomplete
const {
  createWeakRefCache,
  createFinalizationTracker,
  createCacheWithCleanup,
} = require('./task-21-advanced-js');

describe('Task 21: JavaScript - WeakRef и FinalizationRegistry', () => {
  test('должен экспортировать все необходимые функции', () => {
    expect(typeof createWeakRefCache).toBe('function');
    expect(typeof createFinalizationTracker).toBe('function');
    expect(typeof createCacheWithCleanup).toBe('function');
  });

  describe('createWeakRefCache', () => {
    test('set и get сохраняют и возвращают значение по ключу', () => {
      const cache = createWeakRefCache();
      const obj = { id: 1 };
      cache.set('a', obj);
      expect(cache.get('a')).toBe(obj);
    });

    test('has возвращает true для существующего ключа с живым значением', () => {
      const cache = createWeakRefCache();
      cache.set('x', {});
      expect(cache.has('x')).toBe(true);
    });

    test('get возвращает undefined для неизвестного ключа', () => {
      const cache = createWeakRefCache();
      expect(cache.get('missing')).toBeUndefined();
      expect(cache.has('missing')).toBe(false);
    });

    test('delete удаляет запись', () => {
      const cache = createWeakRefCache();
      cache.set('k', {});
      expect(cache.has('k')).toBe(true);
      cache.delete('k');
      expect(cache.has('k')).toBe(false);
      expect(cache.get('k')).toBeUndefined();
    });

    test('поддерживает числовой ключ', () => {
      const cache = createWeakRefCache();
      const v = { n: 42 };
      cache.set(1, v);
      expect(cache.get(1)).toBe(v);
    });
  });

  describe('createFinalizationTracker', () => {
    test('возвращает объект с register и unregister', () => {
      const tracker = createFinalizationTracker(() => {});
      expect(typeof tracker.register).toBe('function');
      expect(typeof tracker.unregister).toBe('function');
    });

    test('register принимает target и heldValue', () => {
      const cleanup = jest.fn();
      const tracker = createFinalizationTracker(cleanup);
      const obj = {};
      tracker.register(obj, 'held');
      tracker.unregister(obj);
      expect(cleanup).not.toHaveBeenCalled();
    });
  });

  describe('createCacheWithCleanup', () => {
    test('get и set работают', () => {
      const cache = createCacheWithCleanup();
      const o = { x: 1 };
      cache.set('a', o);
      expect(cache.get('a')).toBe(o);
      expect(cache.size).toBe(1);
    });

    test('size возвращает количество записей', () => {
      const cache = createCacheWithCleanup();
      cache.set('1', {});
      cache.set('2', {});
      expect(cache.size).toBe(2);
    });

    test('при maxSize при переполнении вызывается очистка «мёртвых» записей', () => {
      const cache = createCacheWithCleanup(2);
      cache.set('a', {});
      cache.set('b', {});
      expect(cache.size).toBe(2);
      cache.set('c', {}); // после очистки мёртвых может остаться место или size останется 3 в зависимости от реализации
      expect(cache.size).toBeGreaterThanOrEqual(2);
    });
  });
});
