// @no-ai-suggestions
// @disable-autocomplete
/*
 * ЗАДАЧА 6: TypeScript - Типы и интерфейсы (Базовый-средний уровень)
 *
 * Реализуйте функции с правильными типами TypeScript:
 *
 * 1. Создайте интерфейс User с полями: id (number), name (string), email (string), age (number, опциональное)
 *
 * 2. Реализуйте функцию filterUsers(users: User[], criteria: UserCriteria): User[]
 *    которая фильтрует пользователей по критериям
 *
 * 3. Реализуйте функцию getUsersByAgeRange(users: User[], min: number, max: number): User[]
 *    которая возвращает пользователей в указанном возрастном диапазоне
 *
 * 4. Реализуйте функцию groupUsersBy(users: User[], key: keyof User): Record<string, User[]>
 *    которая группирует пользователей по указанному полю
 *
 * 5. Создайте generic функцию mapUsers<T>(users: User[], mapper: (user: User) => T): T[]
 *    которая применяет mapper к каждому пользователю
 *
 * Примеры:
 * const users: User[] = [
 *     { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
 *     { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 }
 * ];
 *
 * const filtered = filterUsers(users, { age: 25 });
 * const byAge = getUsersByAgeRange(users, 20, 30);
 * const grouped = groupUsersBy(users, 'name');
 * const names = mapUsers(users, (user) => user.name);
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// Тесты для проверки
const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 25 },
  { id: 4, name: "David", email: "david@example.com" },
];
type UserKeys = keyof User;

const filterUsers = (users: User[], userCiteria: Partial<User>): User[] => {
  let filtered = [...users];

  console.log("asdasdasdasdasd");
  console.log("asdasdasdasdasd");
  console.log("asdasdasdasdasd");
  console.log("asdasdasdasdasd");

  Object.entries(userCiteria)
    // .map(([key, value]) => [key, value])
    .forEach(([fieldToFilter, value]) => {
      console.log("fieldToFilter, value");
      console.log("fieldToFilter, value");
      console.log("fieldToFilter, value");
      console.log("fieldToFilter, value");

      console.log(fieldToFilter, value);
      filtered = filtered.filter(
        (user) => user[fieldToFilter as UserKeys] === value
      );
    });

  return filtered;
};

const getUsersByAgeRange = (
  users: User[],
  min: number,
  max: number
): User[] => {
  return users.filter((user) => user.age && user.age >= min && user.age <= max);
};

const groupUsersBy = (users: User[], key: UserKeys): Record<string, User[]> => {
  return users.reduce((acc, cur) => {
    const filterKey = cur[key] + "";

    return {
      ...acc,
      [filterKey]: acc[filterKey] ? [...acc[filterKey], cur] : [cur],
    };
  }, {} as Record<string, User[]>);
};

const mapUsers = <R>(users: User[], fn: (user: User) => R): R[] => {
  return users.map((user) => {
    return fn(user);
  });
};

console.log("Тест 1:", filterUsers(users, { age: 25 }).length === 2);
console.log("Тест 2:", getUsersByAgeRange(users, 20, 30).length === 3);
console.log("Тест 3:", Object.keys(groupUsersBy(users, "age")).length === 3);
console.log("Тест 4:", mapUsers(users, (user) => user.name).length === 4);

export { User, filterUsers, getUsersByAgeRange, groupUsersBy, mapUsers };
