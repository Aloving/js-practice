/*
 * ЗАДАЧА 7: TypeScript - Generics и Utility Types (Базовый-средний уровень)
 *
 * Реализуйте функции с использованием Generics и Utility Types:
 *
 * 1. Создайте generic функцию identity<T>(value: T): T
 *    которая возвращает переданное значение без изменений
 *
 * 2. Реализуйте generic функцию pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
 *    которая выбирает указанные свойства из объекта
 *
 * 3. Реализуйте generic функцию omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
 *    которая исключает указанные свойства из объекта
 *
 * 4. Реализуйте generic функцию partial<T>(obj: T): Partial<T>
 *    которая делает все свойства объекта опциональными
 *
 * 5. Создайте generic функцию mapObject<T, U>(obj: Record<string, T>, mapper: (value: T) => U): Record<string, U>
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

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

// Тесты для проверки
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// @no-ai-suggestions
// @disable-autocomplete

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 25,
};

console.log("Тест 1:", identity(42) === 42);
console.log("Тест 2:", identity("hello") === "hello");
console.log("Тест 3:", Object.keys(pick(user, ["name", "email"])).length === 2);
console.log("Тест 4:", Object.keys(omit(user, ["age"])).length === 3);
console.log("Тест 5:", Object.keys(partial(user)).length === 4);
console.log("Тест 6:", mapObject({ a: 1, b: 2 }, (x) => x * 2).a === 2);

export { identity, pick, omit, partial, mapObject };
