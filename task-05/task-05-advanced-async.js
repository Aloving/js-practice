// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 5: Продвинутый асинхронный JavaScript (Продвинутый уровень)
 *
 * Реализуйте функции для работы с асинхронными операциями:
 *
 * 1. debounce(func, delay) - откладывает вызов функции до тех пор, пока не пройдет
 *    указанное время с момента последнего вызова. Полезно для обработки событий ввода.
 *
 * 2. throttle(func, delay) - ограничивает частоту вызовов функции, гарантируя,
 *    что функция будет вызвана не чаще одного раза в указанный интервал.
 *
 * 3. retry(fn, maxAttempts, delay) - повторяет выполнение функции в случае ошибки
 *    до указанного количества попыток с задержкой между попытками.
 *
 * 4. promiseQueue(tasks, concurrency) - выполняет массив промисов с ограничением
 *    на количество одновременно выполняемых задач.
 */

function debounce(func, delay) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, delay);

    return;
  };
}

function throttle(func, delay) {
  let timeout;

  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        func(...args);
        timeout = undefined;
      }, delay);
    }

    return;
  };
}

const wait = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

async function retry(fn, maxAttempts = 3, delay = 1000) {
  let countRetry = 0;

  while (countRetry < maxAttempts) {
    try {
      return await fn();
    } catch (e) {
      if (countRetry === maxAttempts) {
        throw e;
      }

      await wait(delay);
      countRetry += 1;
    }
  }
}

const chunksRecursively = (array, elementsInArray, result = []) => {
  return !!array.length
    ? chunksRecursively(array, elementsInArray, [
        ...result,
        array.splice(0, elementsInArray),
      ])
    : result;
};

const sliceToChunks = (array, elementsInArray) => {
  let result = [];

  while (array.length) {
    const chunk = array.splice(0, elementsInArray);

    result = [...result, chunk];
  }

  return result;
};

async function promiseQueue(tasks, concurrency = 1) {
  const chunks = sliceToChunks(tasks, concurrency);
  const queue = chunks.map((chunk) => Promise.all(chunk.map((fn) => fn())));

  return Promise.all(queue).then((result) => {
    return result.flat();
  });
}

module.exports = { debounce, throttle, retry, promiseQueue };
