import { User, filterUsers, getUsersByAgeRange, groupUsersBy, mapUsers } from './task-06-typescript';

describe('Task 6: TypeScript - Типы и интерфейсы', () => {
    const users: User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
        { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 25 },
        { id: 4, name: 'David', email: 'david@example.com' }
    ];

    describe('filterUsers', () => {
        test('должна фильтровать пользователей по возрасту', () => {
            const result = filterUsers(users, { age: 25 });
            expect(result).toHaveLength(2);
            expect(result.every(user => user.age === 25)).toBe(true);
        });

        test('должна возвращать пустой массив, если критерии не совпадают', () => {
            const result = filterUsers(users, { age: 100 });
            expect(result).toEqual([]);
        });

        test('должна работать с опциональными полями', () => {
            const result = filterUsers(users, { name: 'Alice' });
            expect(result).toHaveLength(1);
            expect(result[0].name).toBe('Alice');
        });
    });

    describe('getUsersByAgeRange', () => {
        test('должна возвращать пользователей в возрастном диапазоне', () => {
            const result = getUsersByAgeRange(users, 20, 30);
            expect(result).toHaveLength(3);
            expect(result.every(user => user.age && user.age >= 20 && user.age <= 30)).toBe(true);
        });

        test('должна исключать пользователей без возраста', () => {
            const result = getUsersByAgeRange(users, 0, 100);
            expect(result).toHaveLength(3);
            expect(result.every(user => user.age !== undefined)).toBe(true);
        });

        test('должна возвращать пустой массив для несуществующего диапазона', () => {
            const result = getUsersByAgeRange(users, 100, 200);
            expect(result).toEqual([]);
        });
    });

    describe('groupUsersBy', () => {
        test('должна группировать пользователей по возрасту', () => {
            const result = groupUsersBy(users, 'age');
            expect(Object.keys(result)).toContain('25');
            expect(Object.keys(result)).toContain('30');
            expect(result['25']).toHaveLength(2);
            expect(result['30']).toHaveLength(1);
        });

        test('должна группировать пользователей по имени', () => {
            const result = groupUsersBy(users, 'name');
            expect(result['Alice']).toHaveLength(1);
            expect(result['Bob']).toHaveLength(1);
        });

        test('должна обрабатывать undefined значения', () => {
            const result = groupUsersBy(users, 'age');
            expect(result['undefined']).toBeDefined();
        });
    });

    describe('mapUsers', () => {
        test('должна применять mapper к каждому пользователю', () => {
            const names = mapUsers(users, (user) => user.name);
            expect(names).toEqual(['Alice', 'Bob', 'Charlie', 'David']);
        });

        test('должна работать с разными типами возвращаемых значений', () => {
            const emails = mapUsers(users, (user) => user.email);
            expect(emails).toHaveLength(4);
            expect(emails.every(email => typeof email === 'string')).toBe(true);

            const ids = mapUsers(users, (user) => user.id);
            expect(ids).toHaveLength(4);
            expect(ids.every(id => typeof id === 'number')).toBe(true);
        });

        test('должна создавать новые объекты', () => {
            const userSummaries = mapUsers(users, (user) => ({
                id: user.id,
                name: user.name
            }));
            expect(userSummaries).toHaveLength(4);
            expect(userSummaries[0]).toEqual({ id: 1, name: 'Alice' });
        });
    });
});













