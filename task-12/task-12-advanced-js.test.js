// @no-ai-suggestions
// @disable-autocomplete
const { createRangeIterator, createFibonacciGenerator, createAsyncGenerator, createChunkGenerator, createCombinationGenerator } = require('./task-12-advanced-js');

describe('Task 12: JavaScript - Генераторы и итераторы', () => {
    test('должен экспортировать все необходимые функции', () => {
        expect(typeof createRangeIterator).toBe('function');
        expect(typeof createFibonacciGenerator).toBe('function');
        expect(typeof createAsyncGenerator).toBe('function');
        expect(typeof createChunkGenerator).toBe('function');
        expect(typeof createCombinationGenerator).toBe('function');
    });

    describe('createRangeIterator', () => {
        test('возвращает итератор с числами от start до end с шагом step (положительный шаг)', () => {
            const iterator = createRangeIterator(0, 5, 1);
            expect([...iterator]).toEqual([0, 1, 2, 3, 4, 5]);
        });

        test('работает с шагом 2', () => {
            const iterator = createRangeIterator(0, 6, 2);
            expect([...iterator]).toEqual([0, 2, 4, 6]);
        });

        test('работает с отрицательным шагом (убывающая последовательность)', () => {
            const iterator = createRangeIterator(5, 0, -1);
            expect([...iterator]).toEqual([5, 4, 3, 2, 1, 0]);
        });

        test('возвращает один элемент если start === end', () => {
            const iterator = createRangeIterator(3, 3, 1);
            expect([...iterator]).toEqual([3]);
        });

        test('возвращает пустой массив если диапазон невозможен при положительном шаге', () => {
            const iterator = createRangeIterator(10, 0, 1);
            expect([...iterator]).toEqual([]);
        });
    });

    describe('createFibonacciGenerator', () => {
        test('генерирует последовательность Фибоначчи', () => {
            const gen = createFibonacciGenerator();
            const first = [
                gen.next().value,
                gen.next().value,
                gen.next().value,
                gen.next().value,
                gen.next().value,
                gen.next().value,
                gen.next().value,
            ];
            expect(first).toEqual([0, 1, 1, 2, 3, 5, 8]);
        });

        test('генератор бесконечный — можно получать следующие значения', () => {
            const gen = createFibonacciGenerator();
            for (let i = 0; i < 15; i++) gen.next();
            expect(gen.next().value).toBe(610);
        });
    });

    describe('createAsyncGenerator', () => {
        test('последовательно вызывает asyncFn для каждого элемента и возвращает результаты', async () => {
            const asyncFn = (x) => Promise.resolve(x * 2);
            const results = [];
            for await (const value of createAsyncGenerator(asyncFn, [1, 2, 3])) {
                results.push(value);
            }
            expect(results).toEqual([2, 4, 6]);
        });

        test('работает с одним элементом', async () => {
            const asyncFn = (x) => Promise.resolve(String(x));
            const results = [];
            for await (const value of createAsyncGenerator(asyncFn, [42])) {
                results.push(value);
            }
            expect(results).toEqual(['42']);
        });

        test('возвращает пустую последовательность для пустого массива items', async () => {
            const asyncFn = (x) => Promise.resolve(x);
            const results = [];
            for await (const value of createAsyncGenerator(asyncFn, [])) {
                results.push(value);
            }
            expect(results).toEqual([]);
        });
    });

    describe('createChunkGenerator', () => {
        test('разбивает массив на чанки указанного размера', () => {
            const gen = createChunkGenerator([1, 2, 3, 4, 5], 2);
            expect([...gen]).toEqual([[1, 2], [3, 4], [5]]);
        });

        test('разбивает массив на чанки по 1', () => {
            const gen = createChunkGenerator([1, 2, 3], 1);
            expect([...gen]).toEqual([[1], [2], [3]]);
        });

        test('возвращает один чанк если chunkSize >= length', () => {
            const gen = createChunkGenerator([1, 2, 3], 10);
            expect([...gen]).toEqual([[1, 2, 3]]);
        });

        test('пустой массив даёт пустую последовательность чанков', () => {
            const gen = createChunkGenerator([], 2);
            expect([...gen]).toEqual([]);
        });
    });

    describe('createCombinationGenerator', () => {
        test('генерирует все комбинации (декартово произведение) двух массивов', () => {
            const gen = createCombinationGenerator([[1, 2], ['a', 'b']]);
            expect([...gen]).toEqual([[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]);
        });

        test('работает с одним массивом', () => {
            const gen = createCombinationGenerator([['x', 'y']]);
            expect([...gen]).toEqual([['x'], ['y']]);
        });

        test('работает с тремя массивами', () => {
            const gen = createCombinationGenerator([[0, 1], ['a'], [true, false]]);
            expect([...gen]).toEqual([
                [0, 'a', true],
                [0, 'a', false],
                [1, 'a', true],
                [1, 'a', false],
            ]);
        });

        test('пустой массив массивов даёт одну пустую комбинацию', () => {
            const gen = createCombinationGenerator([]);
            expect([...gen]).toEqual([[]]);
        });
    });
});
