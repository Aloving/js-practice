const { of, Subject, firstValueFrom } = require("rxjs");
const { delay } = require("rxjs/operators");

const {
  createDebouncedInputStream,
  createThrottledEventStream,
  createSearchStream,
  retryWithBackoff,
} = require("./task-18-rxjs");

describe("Task 18: RxJS практика", () => {
  describe("createDebouncedInputStream", () => {
    test("debounces and emits only last value; distinctUntilChanged removes duplicates", async () => {
      jest.useFakeTimers();

      const input$ = new Subject();
      const out$ = createDebouncedInputStream(input$, 100);

      const received = [];
      const sub = out$.subscribe((v) => received.push(v));

      input$.next("a");
      jest.advanceTimersByTime(50);
      input$.next("ab");
      jest.advanceTimersByTime(99);
      expect(received).toEqual([]);

      jest.advanceTimersByTime(1);
      expect(received).toEqual(["ab"]);

      input$.next("ab");
      jest.advanceTimersByTime(100);
      expect(received).toEqual(["ab"]);

      input$.next("abc");
      jest.advanceTimersByTime(100);
      expect(received).toEqual(["ab", "abc"]);

      sub.unsubscribe();
      jest.useRealTimers();
    });
  });

  describe("createThrottledEventStream", () => {
    test("throttles events, allowing at most one per window", async () => {
      jest.useFakeTimers();

      const event$ = new Subject();
      const out$ = createThrottledEventStream(event$, 100);

      const received = [];
      const sub = out$.subscribe((v) => received.push(v));

      event$.next(1);
      event$.next(2);
      event$.next(3);
      expect(received).toEqual([1]);

      jest.advanceTimersByTime(99);
      event$.next(4);
      expect(received).toEqual([1]);

      jest.advanceTimersByTime(1);
      event$.next(5);
      expect(received).toEqual([1, 5]);

      sub.unsubscribe();
      jest.useRealTimers();
    });
  });

  describe("createSearchStream", () => {
    test("debounces, filters by min length, distinctUntilChanged and cancels previous via switchMap", async () => {
      jest.useFakeTimers();

      const query$ = new Subject();
      const calls = [];

      const searchFn = (q) => {
        calls.push(q);
        return of(`result:${q}`).pipe(delay(200));
      };

      const out$ = createSearchStream(query$, searchFn, {
        debounceMs: 50,
        minLength: 2,
      });

      const received = [];
      const sub = out$.subscribe((v) => received.push(v));

      query$.next("a");
      jest.advanceTimersByTime(100);
      expect(calls).toEqual([]);

      query$.next("ab");
      jest.advanceTimersByTime(25);
      query$.next("abc");

      jest.advanceTimersByTime(50);
      expect(calls).toEqual(["abc"]);

      jest.advanceTimersByTime(199);
      expect(received).toEqual([]);
      jest.advanceTimersByTime(1);
      expect(received).toEqual(["result:abc"]);

      query$.next("abc");
      jest.advanceTimersByTime(50);
      expect(calls).toEqual(["abc"]);

      sub.unsubscribe();
      jest.useRealTimers();
    });
  });

  describe("retryWithBackoff", () => {
    test("retries with exponential backoff and eventually succeeds", async () => {
      jest.useFakeTimers();

      let attempts = 0;
      const sourceFactory = () =>
        deferLike(() => {
          attempts += 1;
          if (attempts < 3) {
            throw new Error("fail");
          }
          return "ok";
        });

      const out$ = retryWithBackoff(sourceFactory, {
        maxRetries: 3,
        baseDelayMs: 100,
      });

      const promise = firstValueFrom(out$);

      await flushMicrotasks();
      jest.advanceTimersByTime(100);
      await flushMicrotasks();
      jest.advanceTimersByTime(200);

      await expect(promise).resolves.toBe("ok");
      expect(attempts).toBe(3);

      jest.useRealTimers();
    });

    test("throws after maxRetries exhausted", async () => {
      jest.useFakeTimers();

      let attempts = 0;
      const sourceFactory = () =>
        deferLike(() => {
          attempts += 1;
          throw new Error("always");
        });

      const out$ = retryWithBackoff(sourceFactory, {
        maxRetries: 2,
        baseDelayMs: 50,
      });

      const promise = firstValueFrom(out$);

      await flushMicrotasks();
      jest.advanceTimersByTime(50);
      await flushMicrotasks();
      jest.advanceTimersByTime(100);

      await expect(promise).rejects.toThrow("always");
      expect(attempts).toBe(3);

      jest.useRealTimers();
    });
  });
});

function deferLike(factory) {
  const { defer, of } = require("rxjs");
  return defer(() => {
    try {
      const value = factory();
      return of(value);
    } catch (e) {
      const { throwError } = require("rxjs");
      return throwError(() => e);
    }
  });
}

function flushMicrotasks() {
  return new Promise((resolve) => setImmediate(resolve));
}
