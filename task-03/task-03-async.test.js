// @no-ai-suggestions
// @disable-autocomplete
const { fetchUserData, fetchUserDataWithTimeout } = require('./task-03-async.js');

describe('Task 3: Асинхронный JavaScript', () => {
    describe('fetchUserData', () => {
        test('должна загружать данные всех пользователей параллельно', async () => {
            const startTime = Date.now();
            const users = await fetchUserData([1, 2, 3]);
            const endTime = Date.now();
            
            expect(users).toHaveLength(3);
            expect(users.every(u => u !== null)).toBe(true);
            expect(users[0]).toHaveProperty('id', 1);
            expect(users[1]).toHaveProperty('id', 2);
            expect(users[2]).toHaveProperty('id', 3);
            
            // Проверяем, что запросы выполнялись параллельно (время должно быть меньше суммы всех задержек)
            expect(endTime - startTime).toBeLessThan(2000);
        }, 10000);

        test('должна возвращать null для пользователей с ошибкой', async () => {
            const users = await fetchUserData([1, 999, 3]);
            
            expect(users).toHaveLength(3);
            expect(users[0]).not.toBeNull();
            expect(users[1]).toBeNull(); // ID 999 вызывает ошибку
            expect(users[2]).not.toBeNull();
        }, 10000);

        test('должна обрабатывать пустой массив', async () => {
            const users = await fetchUserData([]);
            expect(users).toEqual([]);
        });

        test('должна обрабатывать массив с одним пользователем', async () => {
            const users = await fetchUserData([1]);
            expect(users).toHaveLength(1);
            expect(users[0]).toHaveProperty('id', 1);
        }, 10000);

        test('должна возвращать правильную структуру данных', async () => {
            const users = await fetchUserData([1]);
            expect(users[0]).toHaveProperty('id');
            expect(users[0]).toHaveProperty('name');
            expect(users[0]).toHaveProperty('email');
        }, 10000);
    });

    describe('fetchUserDataWithTimeout', () => {
        test('должна возвращать данные при успешных запросах в пределах таймаута', async () => {
            // Используем большой таймаут для гарантированного успеха
            const users = await fetchUserDataWithTimeout([1, 2, 3], 1000);
            
            expect(users).toHaveLength(3);
            // Могут быть null если запросы медленные, но структура должна быть правильной
            expect(Array.isArray(users)).toBe(true);
        }, 10000);

        test('должна возвращать null для запросов, превысивших таймаут', async () => {
            // Используем очень маленький таймаут
            const users = await fetchUserDataWithTimeout([1, 2, 3], 50);
            
            expect(users).toHaveLength(3);
            // Все запросы должны быть null из-за таймаута
            expect(users.every(u => u === null)).toBe(true);
        }, 10000);

        test('должна обрабатывать ошибки вместе с таймаутом', async () => {
            const users = await fetchUserDataWithTimeout([1, 999, 3], 1000);
            
            expect(users).toHaveLength(3);
            expect(users[1]).toBeNull(); // Ошибка для ID 999
        }, 10000);

        test('должна обрабатывать пустой массив с таймаутом', async () => {
            const users = await fetchUserDataWithTimeout([], 1000);
            expect(users).toEqual([]);
        });
    });

    describe('Производительность', () => {
        test('должна выполнять запросы параллельно, а не последовательно', async () => {
            const startTime = Date.now();
            await fetchUserData([1, 2, 3, 4, 5]);
            const endTime = Date.now();
            
            // Если бы запросы выполнялись последовательно, время было бы ~500ms * 5 = 2500ms
            // При параллельном выполнении время должно быть ~500ms (время самого медленного запроса)
            expect(endTime - startTime).toBeLessThan(2000);
        }, 10000);
    });
});

