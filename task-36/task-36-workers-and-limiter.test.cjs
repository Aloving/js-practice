const { runInWorker, createConcurrencyLimiter } = require("./task-36-workers-and-limiter");

describe("Task 36: Web Workers (worker_threads) + limiter", () => {
  describe("runInWorker", () => {
    test("runs a function in worker and resolves result", async () => {
      const result = await runInWorker((n) => n * 2, 21);
      expect(result).toBe(42);
    });

    test("propagates errors", async () => {
      await expect(
        runInWorker(() => {
          throw new Error("boom");
        }, null)
      ).rejects.toThrow(/boom/);
    });

    test("supports async function", async () => {
      const result = await runInWorker(async (n) => {
        return n + 1;
      }, 1);

      expect(result).toBe(2);
    });

    test("times out when timeoutMs reached", async () => {
      await expect(
        runInWorker(
          () => new Promise(() => {}),
          null,
          {
            timeoutMs: 50,
          }
        )
      ).rejects.toThrow(/timeout/i);
    });
  });

  describe("createConcurrencyLimiter", () => {
    test("limits parallel execution", async () => {
      jest.useFakeTimers();

      const limit = createConcurrencyLimiter(2);
      let active = 0;
      let maxActive = 0;

      const makeTask = (ms) => () =>
        new Promise((resolve) => {
          active += 1;
          maxActive = Math.max(maxActive, active);
          setTimeout(() => {
            active -= 1;
            resolve(ms);
          }, ms);
        });

      const p1 = limit(makeTask(100));
      const p2 = limit(makeTask(100));
      const p3 = limit(makeTask(100));
      const p4 = limit(makeTask(100));

      jest.advanceTimersByTime(100);
      await Promise.resolve();
      jest.advanceTimersByTime(100);
      await Promise.resolve();

      const results = await Promise.all([p1, p2, p3, p4]);
      expect(results).toEqual([100, 100, 100, 100]);
      expect(maxActive).toBe(2);

      jest.useRealTimers();
    });

    test("propagates rejection", async () => {
      const limit = createConcurrencyLimiter(1);
      await expect(limit(() => Promise.reject(new Error("fail")))).rejects.toThrow(
        /fail/
      );
    });
  });
});
