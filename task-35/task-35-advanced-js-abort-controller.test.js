// @no-ai-suggestions
// @disable-autocomplete
const { createAbortablePromise, delay, fetchWithTimeout } = require('./task-35-advanced-js-abort-controller');

const originalFetch = global.fetch;

describe('Task 35: AbortController / AbortSignal', () => {
  test('экспортирует createAbortablePromise, delay, fetchWithTimeout', () => {
    expect(typeof createAbortablePromise).toBe('function');
    expect(typeof delay).toBe('function');
    expect(typeof fetchWithTimeout).toBe('function');
  });

  describe('createAbortablePromise', () => {
    test('resolve работает без signal', async () => {
      const p = createAbortablePromise((res) => res(42));
      await expect(p).resolves.toBe(42);
    });
    test('reject при aborted signal', async () => {
      const c = new AbortController();
      c.abort();
      const p = createAbortablePromise(() => {}, c.signal);
      await expect(p).rejects.toMatchObject({ name: 'AbortError' });
    });
  });

  describe('delay', () => {
    test('resolve через ms без signal', async () => {
      const start = Date.now();
      await delay(50);
      expect(Date.now() - start).toBeGreaterThanOrEqual(40);
    });
    test('reject при aborted signal', async () => {
      const c = new AbortController();
      const p = delay(1000, c.signal);
      c.abort();
      await expect(p).rejects.toMatchObject({ name: 'AbortError' });
    });
  });

  describe('fetchWithTimeout', () => {
    beforeEach(() => {
      global.fetch = jest.fn((url, opts) => {
        return new Promise((resolve, reject) => {
          const signal = opts?.signal;
          if (signal?.aborted) return reject(signal.reason);
          const onAbort = () => reject(signal?.reason ?? new DOMException('Aborted', 'AbortError'));
          signal?.addEventListener?.('abort', onAbort);
          setTimeout(() => {
            signal?.removeEventListener?.('abort', onAbort);
            resolve({ ok: true, url });
          }, 100);
        });
      });
    });
    afterEach(() => {
      global.fetch = originalFetch;
    });
    test('с коротким timeout — reject с AbortError', async () => {
      await expect(fetchWithTimeout('https://example.com', { timeout: 10 })).rejects.toMatchObject({
        name: 'AbortError',
      });
    });
    test('с длинным timeout — resolve', async () => {
      const res = await fetchWithTimeout('https://example.com', { timeout: 500 });
      expect(res.ok).toBe(true);
    });
  });
});
