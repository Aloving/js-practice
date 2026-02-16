// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 21: JavaScript - WeakRef и FinalizationRegistry (Продвинутый уровень)
 *
 * Реализуйте функции с использованием WeakRef и FinalizationRegistry:
 *
 * 1. createWeakRefCache() - создает кэш, в котором значения хранятся через WeakRef.
 *    Когда объект-значение больше нигде не используется, он может быть собран GC.
 *    Возвращает объект с методами:
 *    - set(key, value) - сохраняет значение по ключу (key — строка или число, value — объект)
 *    - get(key) - возвращает value или undefined, если ключа нет или объект уже собран
 *    - has(key) - проверяет наличие ключа (и что значение ещё не собрано)
 *    - delete(key) - удаляет запись по ключу
 *
 * 2. createFinalizationTracker(onCleanup) - создает трекер, который вызывает onCleanup(heldValue)
 *    когда зарегистрированный объект будет собран GC. Возвращает объект с методами:
 *    - register(target, heldValue) - регистрирует target; при сборке target вызовется onCleanup(heldValue)
 *    - unregister(target) - отменяет регистрацию
 *
 * 3. createCacheWithCleanup(maxSize?) - кэш с ограничением по размеру (опционально).
 *    При добавлении сверх maxSize удаляются записи с уже собранными (deref() === undefined) значениями.
 *    Методы: get(key), set(key, value), size (геттер — текущее количество записей с «живыми» значениями).
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

function createWeakRefCache() {
  const map = new Map();
  const registry = new FinalizationRegistry((key) => map.delete(key));
  return {
    set(key, value) {
      if (value != null && typeof value === 'object') {
        map.set(key, new WeakRef(value));
        registry.register(value, key);
      }
    },
    get(key) {
      const ref = map.get(key);
      if (!ref) return undefined;
      const value = ref.deref();
      if (value === undefined) map.delete(key);
      return value;
    },
    has(key) {
      return this.get(key) !== undefined;
    },
    delete(key) {
      return map.delete(key);
    },
  };
}

function createFinalizationTracker(onCleanup) {
  const registry = new FinalizationRegistry(onCleanup);
  return {
    register(target, heldValue) {
      registry.register(target, heldValue);
    },
    unregister(target) {
      registry.unregister(target);
    },
  };
}

function createCacheWithCleanup(maxSize = 0) {
  const map = new Map();
  const registry = new FinalizationRegistry((key) => map.delete(key));

  function cleanDead() {
    for (const [k, ref] of map.entries()) {
      if (ref.deref() === undefined) map.delete(k);
    }
    if (maxSize > 0 && map.size > maxSize) {
      const keys = [...map.keys()];
      for (let i = 0; map.size > maxSize && i < keys.length; i++) {
        const ref = map.get(keys[i]);
        if (ref && ref.deref() === undefined) map.delete(keys[i]);
      }
    }
  }

  return {
    get(key) {
      cleanDead();
      const ref = map.get(key);
      if (!ref) return undefined;
      const value = ref.deref();
      if (value === undefined) map.delete(key);
      return value;
    },
    set(key, value) {
      cleanDead();
      if (maxSize > 0 && map.size >= maxSize) cleanDead();
      if (value != null && typeof value === 'object') {
        map.set(key, new WeakRef(value));
        registry.register(value, key);
      }
    },
    get size() {
      cleanDead();
      return map.size;
    },
  };
}

module.exports = {
  createWeakRefCache,
  createFinalizationTracker,
  createCacheWithCleanup,
};
