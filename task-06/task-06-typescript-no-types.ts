// @no-ai-suggestions
// @disable-autocomplete

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
