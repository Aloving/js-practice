// @no-ai-suggestions
// @disable-autocomplete
const {
  debounce,
  throttle,
  retry,
  promiseQueue,
  runSequentially,
  runSequentiallyReduce,
  runSequentiallyRecursive,
} = require('./task-05-advanced-async.js');

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

    describe('runSequentially', () => {
        test('должен выполнять задачи по одной и возвращать результаты по порядку', async () => {
            const order = [];
            const tasks = [
                () => new Promise((r) => setTimeout(() => { order.push(1); r(1); }, 20)),
                () => new Promise((r) => setTimeout(() => { order.push(2); r(2); }, 10)),
                () => new Promise((r) => setTimeout(() => { order.push(3); r(3); }, 5)),
            ];

            const results = await runSequentially(tasks);
            expect(results).toEqual([1, 2, 3]);
            expect(order).toEqual([1, 2, 3]);
        });

        test('работает с массивом промисов (не только с функциями)', async () => {
            const results = await runSequentially([
                Promise.resolve(10),
                Promise.resolve(20),
            ]);
            expect(results).toEqual([10, 20]);
        });
    });

    describe('runSequentiallyReduce', () => {
        test('ведёт себя как runSequentially', async () => {
            const order = [];
            const tasks = [
                () => new Promise((r) => setTimeout(() => { order.push(1); r(1); }, 15)),
                () => new Promise((r) => setTimeout(() => { order.push(2); r(2); }, 5)),
            ];
            const results = await runSequentiallyReduce(tasks);
            expect(results).toEqual([1, 2]);
            expect(order).toEqual([1, 2]);
        });
    });

    describe('runSequentiallyRecursive', () => {
        test('ведёт себя как runSequentially', async () => {
            const order = [];
            const tasks = [
                () => new Promise((r) => setTimeout(() => { order.push(1); r(1); }, 15)),
                () => new Promise((r) => setTimeout(() => { order.push(2); r(2); }, 5)),
            ];
            const results = await runSequentiallyRecursive(tasks);
            expect(results).toEqual([1, 2]);
            expect(order).toEqual([1, 2]);
        });
    });
});
