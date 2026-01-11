const { debounce, throttle, retry, promiseQueue } = require('./task-05-advanced-async.js');

describe('Task 5: Продвинутый асинхронный JavaScript', () => {
    describe('debounce', () => {
        test('должен откладывать вызов функции', (done) => {
            let callCount = 0;
            const debouncedFn = debounce(() => { callCount++; }, 100);

            debouncedFn();
            debouncedFn();
            debouncedFn();

            expect(callCount).toBe(0);

            setTimeout(() => {
                expect(callCount).toBe(1);
                done();
            }, 150);
        });
    });

    describe('throttle', () => {
        test('должен ограничивать частоту вызовов', async () => {
            let callCount = 0;
            const throttledFn = throttle(() => { 
                callCount++;
            }, 100);

            throttledFn();
            throttledFn();
            throttledFn();

            // throttle откладывает вызов, поэтому сразу будет 0
            expect(callCount).toBe(0);

            // Ждем выполнения первого вызова
            await new Promise(resolve => setTimeout(resolve, 150));
            expect(callCount).toBe(1);
            
            throttledFn();
            // Ждем выполнения второго вызова
            await new Promise(resolve => setTimeout(resolve, 150));
            expect(callCount).toBe(2);
            
            // Ждем достаточно времени, чтобы все setTimeout завершились
            await new Promise(resolve => setTimeout(resolve, 200));
        }, 10000);
    });

    describe('retry', () => {
        test('должен повторять вызов при ошибке', async () => {
            let attemptCount = 0;
            const failingFn = async () => {
                attemptCount++;
                if (attemptCount < 3) {
                    throw new Error('Failed');
                }
                return 'success';
            };

            const result = await retry(failingFn, 3, 50);
            expect(result).toBe('success');
            expect(attemptCount).toBe(3);
        });
    });

    describe('promiseQueue', () => {
        test('должен выполнять все задачи', async () => {
            const tasks = [
                () => Promise.resolve(1),
                () => Promise.resolve(2),
                () => Promise.resolve(3)
            ];

            const results = await promiseQueue(tasks, 1);
            expect(results).toEqual([1, 2, 3]);
        });
    });
});
