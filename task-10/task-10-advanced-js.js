// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 10: JavaScript - Proxy и Reflect API (Средний-продвинутый уровень)
 *
 * Реализуйте функции с использованием Proxy и Reflect API:
 *
 * 1. createReactiveObject(target) - создает реактивный объект с использованием Proxy,
 *    который логирует все операции чтения, записи и удаления свойств
 *
 * 2. createValidator(target, schema) - создает объект с валидацией на основе Proxy,
 *    который проверяет значения при записи согласно схеме:
 *    schema = { name: 'string', age: 'number', email: 'string' }
 *
 * 3. createCache(target, ttl) - создает прокси-объект с кэшированием результатов вызовов методов,
 *    где ttl - время жизни кэша в миллисекундах
 *
 * 4. createImmutable(target) - создает "неизменяемый" объект с использованием Proxy,
 *    который выбрасывает ошибку при попытке изменить или удалить свойство
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

const createReactiveObject = (target) => {
  return new Proxy(target, {
    get(target, prop, receiver) {
      console.log(`[READ]: Свойство "${String(prop)}"`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      console.log(`[WRITE]: Свойство "${String(prop)}" =`, value);
      return Reflect.set(target, prop, value, receiver);
    },
    deleteProperty(target, prop) {
      console.log(`[DELETE]: Свойство "${String(prop)}"`);
      return Reflect.deleteProperty(target, prop);
    },
  });
};

const createValidator = (target, schema) => {
  return new Proxy(target, {
    set(target, prop, value, receiver) {
      if (!(prop in schema)) {
        throw "not allowed in schema";
      }

      if (prop in schema) {
        if (typeof value !== schema[prop]) {
          throw "Invalid type for " + prop;
        }

        return Reflect.set(target, prop, value, receiver);
      }
    },
  });
};

const createCache = (target, ttl = 1000) => {
  const cache = Object.entries(target).reduce((acc, [key]) => {
    return {
      ...acc,
      [key]: {
        calls: {},
      },
    };
  }, {});

  return new Proxy(target, {
    get(target, prop, receiver) {
      const fn = target[prop];

      const cachedFn = (...args) => {
        const serializedArgs = args.join(":");

        if (cache[prop].calls[serializedArgs]) {
          return cache[prop].calls[serializedArgs];
        } else {
          const result = fn(...args);

          cache[prop] = {
            calls: {
              ...cache[prop].calls,
              [serializedArgs]: result,
            },
          };

          setTimeout(() => {
            delete cache[prop].calls[serializedArgs];
          }, ttl);

          return result;
        }
      };

      return cachedFn;
    },
  });
};

const createImmutable = (target) => {
  const errorText = "Cannot modify immutable object";

  return new Proxy(target, {
    set(target, prop, value) {
      throw new TypeError(errorText);
    },

    deleteProperty(target, prop) {
      throw new TypeError(errorText);
    },

    defineProperty(target, prop, descriptor) {
      throw new TypeError(errorText);
    },
  });
};

module.exports = {
  createReactiveObject,
  createValidator,
  createCache,
  createImmutable,
};
