// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 12: JavaScript - Генераторы и итераторы (Средний-продвинутый уровень)
 *
 * Реализуйте функции с использованием генераторов и итераторов:
 *
 * 1. createRangeIterator(start, end, step) - создает итератор для диапазона чисел
 *    который возвращает числа от start до end с шагом step
 *
 * 2. createFibonacciGenerator() - создает генератор чисел Фибоначчи
 *    который генерирует бесконечную последовательность
 *
 * 3. createAsyncGenerator(asyncFn, items) - создает асинхронный генератор,
 *    который последовательно вызывает asyncFn для каждого элемента items
 *    и возвращает результаты
 *
 * 4. createChunkGenerator(array, chunkSize) - создает генератор, который
 *    разбивает массив на чанки указанного размера
 *
 * 5. createCombinationGenerator(arrays) - создает генератор всех комбинаций
 *    элементов из массивов (декартово произведение)
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

function* createRangeIterator(start, end, step) {
  let count = 0;

  if (start > 0) {
    while (start <= end) {
      count += step;

      yield count;
    }
  }

  if (start < 0) {
    while (start >= end) {
      count += step;

      yield count;
    }
  }
}

function* createFibonacciGenerator() {
  let a = 0;
  let b = 1;

  while (true) {
    yield a;

    [a, b] = [b, a + b];
  }
}

function* createAsyncGenerator(asyncFn, items) {
  for (const item of items) {
    yield asyncFn(item);
  }
}
function* createChunkGenerator(array, chunkSize) {}
function* createCombinationGenerator() {}

module.exports = {
  createRangeIterator,
  createFibonacciGenerator,
  createAsyncGenerator,
  createChunkGenerator,
  createCombinationGenerator,
};
