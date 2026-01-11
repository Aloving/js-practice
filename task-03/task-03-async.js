// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 3: Асинхронный JavaScript (Продвинутый уровень)
 * 
 * Реализуйте функцию fetchUserData, которая:
 * 1. Принимает массив ID пользователей
 * 2. Параллельно загружает данные о каждом пользователе
 * 3. Возвращает Promise, который резолвится с массивом данных пользователей
 * 4. Если запрос к одному из пользователей не удался, вернуть null для этого пользователя
 * 5. Использовать async/await
 * 
 * Для симуляции API используйте функцию mockFetchUser (уже реализована).
 * Она принимает userId и возвращает Promise, который резолвится через случайное время (100-500ms).
 * 
 * Дополнительно: реализуйте функцию fetchUserDataWithTimeout, которая:
 * - Принимает массив ID и таймаут в миллисекундах
 * - Если запрос не завершился за указанное время, возвращает null для этого пользователя
 * 
 * Примеры:
 * fetchUserData([1, 2, 3]).then(users => console.log(users));
 * // Может вернуть: [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }, { id: 3, name: 'User 3' }]
 * 
 * fetchUserDataWithTimeout([1, 2, 3], 200).then(users => console.log(users));
 * // Если запросы занимают больше 200ms, вернет null для медленных запросов
 */

// Симуляция API запроса (не изменяйте эту функцию)
function mockFetchUser(userId) {
    return new Promise((resolve) => {
        const delay = Math.random() * 400 + 100; // 100-500ms
        setTimeout(() => {
            resolve({
                id: userId,
                name: `User ${userId}`,
                email: `user${userId}@example.com`,
                createdAt: new Date().toISOString()
            });
        }, delay);
    });
}

// Симуляция API запроса с возможностью ошибки (для тестирования)
function mockFetchUserWithError(userId) {
    return new Promise((resolve, reject) => {
        const delay = Math.random() * 400 + 100;
        setTimeout(() => {
            if (userId === 999) {
                reject(new Error('User not found'));
            } else {
                resolve({
                    id: userId,
                    name: `User ${userId}`,
                    email: `user${userId}@example.com`
                });
            }
        }, delay);
    });
}

async function fetchUserData(userIds) {
    const fetchUsers = userIds.map(async (userId) => {
        try {
            const request = await mockFetchUserWithError(userId);
            return request;
        } catch (e) {
            return null;
        }

    });

    return Promise.all(fetchUsers);
}

async function fetchUserDataWithTimeout(userIds, timeout) {
    const fetchUsers = userIds.map(async (userId) => {
        try {
            const request = await Promise.race([mockFetchUserWithError(userId), new Promise((resolve) => {
                setTimeout(() => {
                    resolve(null);
                }, timeout);
            })]);
            return request;
        } catch (e) {
            return null;
        }

    });

    return Promise.all(fetchUsers);
}

// Тесты для проверки
(async () => {
    console.log('Тест 1: Загрузка данных пользователей');
    const users1 = await fetchUserData([1, 2, 3]);
    console.log('Результат:', users1);
    console.log('Проверка:', users1.length === 3 && users1.every(u => u !== null));
    
    console.log('\nТест 2: Обработка ошибок');
    const users2 = await fetchUserData([1, 999, 3]);
    console.log('Результат:', users2);
    console.log('Проверка:', users2.length === 3 && users2[1] === null);
    
    console.log('\nТест 3: Таймаут');
    const users3 = await fetchUserDataWithTimeout([1, 2, 3], 200);
    console.log('Результат:', users3);
    console.log('Проверка:', users3.length === 3);
})();



module.exports = { fetchUserData, fetchUserDataWithTimeout, mockFetchUserWithError };