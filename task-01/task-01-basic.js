// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 1: Работа с массивами и функциями (Базовый уровень)
 * 
 * Напишите функцию, которая принимает массив чисел и возвращает новый массив,
 * содержащий только четные числа, умноженные на 2, отсортированные по возрастанию.
 * 
 * Требования:
 * - Использовать методы массивов (filter, map, sort)
 * - Не изменять исходный массив
 * - Вернуть пустой массив, если четных чисел нет
 * 
 * Примеры:
 * processNumbers([1, 2, 3, 4, 5, 6]) => [4, 8, 12]
 * processNumbers([1, 3, 5]) => []
 * processNumbers([10, 5, 8, 3, 2]) => [4, 16, 20]
 */

function processNumbers(numbers) {
    return numbers.filter((number) => number % 2 === 0).map((number) => number * 2).sort((a, b) => a - b);
}

// Тесты для проверки
console.log('Тест 1:', JSON.stringify(processNumbers([1, 2, 3, 4, 5, 6])) === JSON.stringify([4, 8, 12]));
console.log('Тест 2:', JSON.stringify(processNumbers([1, 3, 5])) === JSON.stringify([]));
console.log('Тест 3:', JSON.stringify(processNumbers([10, 5, 8, 3, 2])) === JSON.stringify([4, 16, 20]));
console.log('Тест 4:', JSON.stringify(processNumbers([])) === JSON.stringify([]));



module.exports = { processNumbers };