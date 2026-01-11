// @no-ai-suggestions
// @disable-autocomplete
/**
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

// Тесты для проверки
const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
    { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 25 },
    { id: 4, name: 'David', email: 'david@example.com' }
];

console.log('Тест 1:', filterUsers(users, { age: 25 }).length === 2);
console.log('Тест 2:', getUsersByAgeRange(users, 20, 30).length === 3);
console.log('Тест 3:', Object.keys(groupUsersBy(users, 'age')).length === 3);
console.log('Тест 4:', mapUsers(users, (user) => user.name).length === 4);

export { User, filterUsers, getUsersByAgeRange, groupUsersBy, mapUsers };













