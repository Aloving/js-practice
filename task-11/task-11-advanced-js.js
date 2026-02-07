// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 11: JavaScript - WeakMap, WeakSet, Symbol (Средний-продвинутый уровень)
 *
 * Реализуйте функции с использованием WeakMap, WeakSet и Symbol:
 *
 * 1. createPrivateStorage() - создает систему приватного хранения данных для объектов
 *    используя WeakMap. Возвращает объект с методами:
 *    - set(instance, key, value) - сохраняет приватное значение
 *    - get(instance, key) - получает приватное значение
 *    - has(instance, key) - проверяет наличие ключа
 *
 * 2. createWeakSetTracker() - создает трекер объектов с использованием WeakSet.
 *    Возвращает объект с методами:
 *    - track(obj) - добавляет объект в трекер
 *    - isTracked(obj) - проверяет, отслеживается ли объект
 *    - getTrackedCount() - возвращает примерное количество отслеживаемых объектов
 *
 * 3. createSymbolRegistry() - создает реестр символов с использованием Map.
 *    Возвращает объект с методами:
 *    - register(name) - регистрирует символ по имени, возвращает существующий если есть
 *    - get(name) - получает символ по имени
 *    - has(name) - проверяет наличие символа
 *
 * 4. createPrivateMethod(obj, methodName, implementation) - добавляет приватный метод
 *    к объекту используя Symbol в качестве ключа
 *
 * 5. createObjectMemoizer(fn) - создает мемоизатор на WeakMap для кэширования результатов
 *    по объектному ключу. Возвращает функцию memoized(obj, ...args).
 *    - Если memoized вызывается с тем же obj и теми же args, должен возвращаться кэш.
 *
 * 6. createSymbolProperty(obj, name, value) - добавляет к объекту скрытое свойство,
 *    используя Symbol(name) как ключ. Возвращает Symbol-ключ.
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

const createPrivateStorage = () => {
  const store = new WeakMap();

  const ensureInstanceMap = (instance) => {
    if (typeof instance !== "object" || instance === null) {
      throw new TypeError("instance must be an object");
    }

    let instanceMap = store.get(instance);
    if (!instanceMap) {
      instanceMap = new Map();
      store.set(instance, instanceMap);
    }

    return instanceMap;
  };

  return {
    set(instance, key, value) {
      const instanceMap = ensureInstanceMap(instance);
      instanceMap.set(key, value);
    },
    get(instance, key) {
      const instanceMap = store.get(instance);
      return instanceMap ? instanceMap.get(key) : undefined;
    },
    has(instance, key) {
      const instanceMap = store.get(instance);
      return instanceMap ? instanceMap.has(key) : false;
    },
  };
};

const createWeakSetTracker = () => {
  const tracked = new WeakSet();
  let count = 0;

  return {
    track(obj) {
      if (typeof obj !== "object" || obj === null) {
        throw new TypeError("obj must be an object");
      }

      if (!tracked.has(obj)) {
        tracked.add(obj);
        count += 1;
      }
    },
    isTracked(obj) {
      if (typeof obj !== "object" || obj === null) {
        return false;
      }
      return tracked.has(obj);
    },
    getTrackedCount() {
      return count;
    },
  };
};

const createSymbolRegistry = () => {
  const registry = new Map();

  return {
    register(name) {
      if (registry.has(name)) {
        return registry.get(name);
      }

      const symbol = Symbol(name);
      registry.set(name, symbol);
      return symbol;
    },
    get(name) {
      return registry.get(name);
    },
    has(name) {
      return registry.has(name);
    },
  };
};

const createPrivateMethod = (obj, methodName, implementation) => {
  if (typeof obj !== "object" || obj === null) {
    throw new TypeError("obj must be an object");
  }
  if (typeof implementation !== "function") {
    throw new TypeError("implementation must be a function");
  }

  const key = Symbol(methodName);
  Object.defineProperty(obj, key, {
    value: implementation,
    writable: false,
    enumerable: false,
    configurable: false,
  });

  return key;
};

const createObjectMemoizer = (fn) => {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }

  const cache = new WeakMap();

  return (obj, ...args) => {
    if (typeof obj !== "object" || obj === null) {
      throw new TypeError("obj must be an object");
    }

    let objCache = cache.get(obj);
    if (!objCache) {
      objCache = new Map();
      cache.set(obj, objCache);
    }

    const key = JSON.stringify(args);
    if (objCache.has(key)) {
      return objCache.get(key);
    }

    const result = fn(obj, ...args);
    objCache.set(key, result);
    return result;
  };
};

const createSymbolProperty = (obj, name, value) => {
  if (typeof obj !== "object" || obj === null) {
    throw new TypeError("obj must be an object");
  }

  const key = Symbol(name);
  Object.defineProperty(obj, key, {
    value,
    writable: true,
    enumerable: false,
    configurable: true,
  });
  return key;
};

module.exports = {
  createPrivateStorage,
  createWeakSetTracker,
  createSymbolRegistry,
  createPrivateMethod,
  createObjectMemoizer,
  createSymbolProperty,
};
