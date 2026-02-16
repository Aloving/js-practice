// @no-ai-suggestions
// @disable-autocomplete
const { LRUCache } = require('./task-interview-07-lru-cache.js');

describe('Task Interview 7: LRU Cache', () => {
  test('get возвращает значение и обновляет порядок', () => {
    const cache = new LRUCache(2);
    cache.set('a', 1);
    cache.set('b', 2);
    expect(cache.get('a')).toBe(1);
    cache.set('c', 3);
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('a')).toBe(1);
    expect(cache.get('c')).toBe(3);
  });

  test('get неизвестного ключа возвращает undefined', () => {
    const cache = new LRUCache(2);
    cache.set('x', 1);
    expect(cache.get('y')).toBeUndefined();
    expect(cache.get('x')).toBe(1);
  });

  test('set перезаписывает значение по тому же ключу', () => {
    const cache = new LRUCache(2);
    cache.set('a', 1);
    cache.set('a', 2);
    expect(cache.get('a')).toBe(2);
  });

  test('ёмкость 1: только один элемент', () => {
    const cache = new LRUCache(1);
    cache.set('a', 1);
    cache.set('b', 2);
    expect(cache.get('a')).toBeUndefined();
    expect(cache.get('b')).toBe(2);
  });
});
