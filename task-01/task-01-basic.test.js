const { processNumbers } = require('./task-01-basic.js');

describe('Task 1: Работа с массивами и функциями', () => {
    test('должна фильтровать четные числа, умножать на 2 и сортировать', () => {
        const result = processNumbers([1, 2, 3, 4, 5, 6]);
        expect(result).toEqual([4, 8, 12]);
    });

    test('должна возвращать пустой массив, если нет четных чисел', () => {
        const result = processNumbers([1, 3, 5]);
        expect(result).toEqual([]);
    });

    test('должна корректно обрабатывать смешанный массив', () => {
        const result = processNumbers([10, 5, 8, 3, 2]);
        expect(result).toEqual([4, 16, 20]);
    });

    test('должна возвращать пустой массив для пустого входного массива', () => {
        const result = processNumbers([]);
        expect(result).toEqual([]);
    });

    test('не должна изменять исходный массив', () => {
        const input = [1, 2, 3, 4, 5, 6];
        const originalInput = [...input];
        processNumbers(input);
        expect(input).toEqual(originalInput);
    });

    test('должна обрабатывать отрицательные числа', () => {
        const result = processNumbers([-4, -3, -2, -1, 0, 1, 2]);
        expect(result).toEqual([-8, -4, 0, 4]);
    });

    test('должна обрабатывать большие числа', () => {
        const result = processNumbers([100, 101, 102, 103, 104]);
        expect(result).toEqual([200, 204, 208]);
    });
});

