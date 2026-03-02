// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 35: JavaScript — AbortController / AbortSignal (продвинутый уровень)
 *
 * 1. createAbortablePromise(executor, signal?) — обёртка над Promise.
 *    executor(resolve, reject) — обычная функция-исполнитель.
 *    Если signal.aborted или signal выдаёт abort до resolve/reject — promise reject'ится
 *    с причиной signal.reason (или new DOMException('Aborted')).
 *
 * 2. delay(ms, signal?) — Promise, который resolve'ится через ms мс.
 *    Если signal.aborted до истечения — reject с AbortError.
 *
 * 3. fetchWithTimeout(url, options?) — как fetch, но с таймаутом.
 *    options.timeout — число мс. По истечении — AbortError.
 *    Использовать AbortController и AbortSignal.
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

function createAbortablePromise(executor, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason ?? new DOMException('Aborted', 'AbortError'));
      return;
    }
    const onAbort = () => {
      reject(signal?.reason ?? new DOMException('Aborted', 'AbortError'));
    };
    signal?.addEventListener?.('abort', onAbort);
    executor(
      (v) => {
        signal?.removeEventListener?.('abort', onAbort);
        resolve(v);
      },
      (e) => {
        signal?.removeEventListener?.('abort', onAbort);
        reject(e);
      }
    );
  });
}

function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason ?? new DOMException('Aborted', 'AbortError'));
      return;
    }
    const t = setTimeout(() => {
      signal?.removeEventListener?.('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(t);
      reject(signal?.reason ?? new DOMException('Aborted', 'AbortError'));
    };
    signal?.addEventListener?.('abort', onAbort);
  });
}

async function fetchWithTimeout(url, options = {}) {
  const { timeout, ...fetchOpts } = options;
  if (timeout == null) return fetch(url, fetchOpts);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...fetchOpts, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

module.exports = { createAbortablePromise, delay, fetchWithTimeout };
