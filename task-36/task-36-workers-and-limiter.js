// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 36: Web Workers (worker_threads) + полезная утилита
 *
 * 1) runInWorker(fn, data, options)
 *    Реализуйте запуск функции в отдельном потоке (в Node.js используйте worker_threads).
 *
 *    Требования:
 *    - fn: функция (data) => any | Promise<any>
 *    - data: данные, которые передаются в воркер
 *    - options: { timeoutMs?: number }
 *    - возвращает Promise с результатом работы fn
 *    - если fn бросает ошибку/возвращает reject — Promise должен быть rejected
 *    - при timeoutMs воркер должен быть остановлен и промис должен быть rejected
 *
 * 2) createConcurrencyLimiter(concurrency)
 *    Произвольная тема: ограничитель параллелизма.
 *
 *    Требования:
 *    - concurrency: максимальное число одновременно выполняющихся задач
 *    - возвращает функцию limit(task)
 *      где task — функция без аргументов, возвращающая Promise
 *    - limit(task) возвращает Promise результата task
 *    - если task reject — limit(task) тоже reject
 */

const { Worker } = require("worker_threads");

function runInWorker(fn, data, options = {}) {
  const { timeoutMs } = options;

  if (typeof fn !== "function") {
    return Promise.reject(new TypeError("fn must be a function"));
  }

  const workerCode = `
    const { parentPort, workerData } = require('worker_threads');

    (async () => {
      try {
        const fn = eval('(' + workerData.fn + ')');
        const result = await fn(workerData.data);
        parentPort.postMessage({ ok: true, result });
      } catch (error) {
        parentPort.postMessage({ ok: false, error: { message: String(error && error.message ? error.message : error) } });
      }
    })();
  `;

  return new Promise((resolve, reject) => {
    const worker = new Worker(workerCode, {
      eval: true,
      workerData: {
        fn: fn.toString(),
        data,
      },
    });

    let timeoutId;
    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    if (typeof timeoutMs === "number" && timeoutMs > 0) {
      timeoutId = setTimeout(() => {
        worker.terminate().finally(() => {
          reject(new Error("Worker timeout"));
        });
      }, timeoutMs);
    }

    worker.once("message", (msg) => {
      cleanup();
      worker.terminate().finally(() => {
        if (msg && msg.ok) {
          resolve(msg.result);
        } else {
          reject(new Error(msg?.error?.message || "Worker error"));
        }
      });
    });

    worker.once("error", (err) => {
      cleanup();
      worker.terminate().finally(() => {
        reject(err);
      });
    });
  });
}

function createConcurrencyLimiter(concurrency = 1) {
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new TypeError("concurrency must be a positive integer");
  }

  let active = 0;
  const queue = [];

  const runNext = () => {
    if (active >= concurrency) return;
    const next = queue.shift();
    if (!next) return;

    active += 1;

    Promise.resolve()
      .then(next.task)
      .then(next.resolve, next.reject)
      .finally(() => {
        active -= 1;
        runNext();
      });
  };

  return (task) => {
    if (typeof task !== "function") {
      return Promise.reject(new TypeError("task must be a function"));
    }

    return new Promise((resolve, reject) => {
      queue.push({ task, resolve, reject });
      runNext();
    });
  };
}

module.exports = {
  runInWorker,
  createConcurrencyLimiter,
};
