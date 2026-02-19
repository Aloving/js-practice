// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 31: Структуры данных — LFU Cache (Least Frequently Used), продвинутый уровень
 *
 * Кэш с вытеснением по частоте использования: при переполнении удаляется ключ
 * с наименьшим счётчиком обращений. При равенстве — LRU (наименее недавно использованный).
 *
 * Методы:
 * - constructor(capacity) — capacity > 0
 * - get(key) — вернуть значение или undefined; увеличить счётчик частоты
 * - set(key, value) — сохранить; при переполнении удалить LFU
 *
 * Желательно get/set за O(1).
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.freq = new Map();
    this.freqToKeys = new Map();
    this.minFreq = 0;
  }

  get(key) {
    if (this.capacity === 0) return undefined;
    const item = this.cache.get(key);
    if (!item) return undefined;
    this._updateFreq(key);
    return item.value;
  }

  set(key, value) {
    if (this.capacity === 0) return;
    if (this.cache.has(key)) {
      this.cache.get(key).value = value;
      this._updateFreq(key);
      return;
    }
    if (this.cache.size >= this.capacity) {
      const keysAtMin = this.freqToKeys.get(this.minFreq);
      const toRemove = keysAtMin.keys().next().value;
      keysAtMin.delete(toRemove);
      if (keysAtMin.size === 0) this.freqToKeys.delete(this.minFreq);
      this.cache.delete(toRemove);
      this.freq.delete(toRemove);
    }
    this.cache.set(key, { value, freq: 1 });
    this.freq.set(key, 1);
    if (!this.freqToKeys.has(1)) this.freqToKeys.set(1, new Map());
    this.freqToKeys.get(1).set(key, true);
    this.minFreq = 1;
  }

  _updateFreq(key) {
    const item = this.cache.get(key);
    const oldF = item.freq;
    const newF = oldF + 1;
    item.freq = newF;
    this.freq.set(key, newF);
    this.freqToKeys.get(oldF).delete(key);
    if (this.freqToKeys.get(oldF).size === 0) {
      this.freqToKeys.delete(oldF);
      if (this.minFreq === oldF) this.minFreq = newF;
    }
    if (!this.freqToKeys.has(newF)) this.freqToKeys.set(newF, new Map());
    this.freqToKeys.get(newF).set(key, true);
  }
}

module.exports = { LFUCache };
