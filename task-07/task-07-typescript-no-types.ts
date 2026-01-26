// @no-ai-suggestions
// @disable-autocomplete

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

/*
 * ЗАДАЧА 7: TypeScript - Generics и Utility Types (Базовый-средний уровень)
 *
 * Реализуйте функции с использованием Generics и Utility Types:
 *
 * 1. Создайте generic функцию identity
 *    которая возвращает переданное значение без изменений
 *
 * 2. Реализуйте generic функцию pick
 *    которая выбирает указанные свойства из объекта
 *
 * 3. Реализуйте generic функцию
 *    которая исключает указанные свойства из объекта
 *
 * 4. Реализуйте generic функцию
 *    которая делает все свойства объекта опциональными
 *
 * 5. Создайте generic функцию
 *    которая применяет mapper к каждому значению объекта
 *
 * Примеры:
 * interface User {
 *     id: number;
 *     name: string;
 *     email: string;
 *     age: number;
 * }
 *
 * const user: User = { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 };
 *
 * const picked = pick(user, ['name', 'email']); // { name: 'Alice', email: 'alice@example.com' }
 * const omitted = omit(user, ['age']); // { id: 1, name: 'Alice', email: 'alice@example.com' }
 * const partialUser = partial(user); // все свойства опциональны
 * const mapped = mapObject({ a: 1, b: 2 }, (x) => x * 2); // { a: 2, b: 4 }
 */

// Тесты для проверки
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 25,
};

type Exclude<T, V> = T extends V ? never : T;

const identity = <V>(value: V) => value;
const pick = <T, K extends keyof T>(obj: T, keys: K[]): { [P in K]: T[P] } => {
  return keys.reduce((acc, cur) => {
    acc[cur] = obj[cur];

    return acc;
  }, {} as Pick<T, keyof T>);
};
const omit = <Obj, K extends keyof Obj>(
  obj: Obj,
  keys: K[]
): { [P in Exclude<keyof Obj, K>]: Obj[P] } => {
  const newObj = { ...obj };

  keys.forEach((objKey) => {
    delete newObj[objKey];
  });

  return newObj;
};

const partial = <Obj>(obj: Obj) => {
  return obj as {
    [P in keyof Obj]-?: Obj[P];
  };
};

const mapObject = <T extends Object, R>(
  obj: T,
  fn: (value: T[keyof T]) => R
): { [P in keyof T]: R } => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: fn(value),
    };
  }, {} as { [P in keyof T]: R });
};

console.log("Тест 1:", identity(42) === 42);
console.log("Тест 2:", identity("hello") === "hello");
console.log("Тест 3:", Object.keys(pick(user, ["name", "email"])));
console.log("Тест 4:", Object.keys(omit(user, ["age"])).length === 3);
console.log("Тест 5:", Object.keys(partial(user)).length === 4);
console.log("Тест 6:", mapObject({ a: 1, b: 2 }, (x) => x * 2).a === 2);

export { identity, pick, omit, partial, mapObject };
