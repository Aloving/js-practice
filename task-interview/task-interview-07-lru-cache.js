// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 7: LRU Cache (Продвинутый уровень, собеседование)
 *
 * Реализуйте кэш с вытеснением по правилу «наименее недавно использованный» (LRU).
 *
 * Требования:
 * - Конструктор: new LRUCache(capacity) — capacity > 0
 * - get(key): вернуть значение или undefined, если ключа нет; обновить «последность» использования
 * - set(key, value): сохранить пару; при переполнении удалить наименее недавно использованный ключ
 * - Ключи и значения — любые (в т.ч. объекты). Считаем равенство ключей по ссылке (===)
 * - Желательно get/set за O(1) по времени
 *
 * Пример:
 * const cache = new LRUCache(2);
 * cache.set('a', 1);
 * cache.set('b', 2);
 * cache.get('a'); // 1
 * cache.set('c', 3); // вытесняет 'b'
 * cache.get('b');   // undefined
 * cache.get('a');   // 1
 * cache.get('c');   // 3
 */

class LRUCache {
  capacity = 0;
  storage = new Map([]);

  constructor(capacity) {
    this.capacity = capacity;
  }

  get isReached() {
    return this.storage.size > this.capacity;
  }

  get(key) {
    const value = this.storage.get(key);

    if (value) {
      this.storage.delete(key);
      this.storage.set(key, value);

      return value;
    }

    return value;
  }

  set(key, value) {
    if (this.storage.has(key)) {
      this.storage.delete(key);
    }

    this.storage.set(key, value);

    if (this.isReached) {
      const firstKey = this.storage.keys().next().value;

      this.storage.delete(firstKey);
    }
  }
}

module.exports = { LRUCache };
