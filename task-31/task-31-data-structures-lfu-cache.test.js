// @no-ai-suggestions
// @disable-autocomplete
const { LFUCache } = require('./task-31-data-structures-lfu-cache');

describe('Task 31: LFU Cache', () => {
  test('экспортирует LFUCache', () => {
    expect(typeof LFUCache).toBe('function');
  });

  test('get возвращает undefined для отсутствующего ключа', () => {
    const cache = new LFUCache(2);
    expect(cache.get('x')).toBeUndefined();
  });

  test('set и get: значение сохраняется', () => {
    const cache = new LFUCache(2);
    cache.set('a', 1);
    expect(cache.get('a')).toBe(1);
  });

  test('при переполнении вытесняется наименее часто используемый', () => {
    const cache = new LFUCache(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.get('a');
    cache.set('c', 3);
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('a')).toBe(1);
    expect(cache.get('c')).toBe(3);
  });

  test('при равенстве частот вытесняется LRU', () => {
    const cache = new LFUCache(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.get('a');
    cache.get('b');
    cache.set('c', 3);
    expect(cache.get('a')).toBeUndefined();
    expect(cache.get('b')).toBe(2);
    expect(cache.get('c')).toBe(3);
  });
});
