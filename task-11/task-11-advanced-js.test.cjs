const {
  createPrivateStorage,
  createWeakSetTracker,
  createSymbolRegistry,
  createPrivateMethod,
  createObjectMemoizer,
  createSymbolProperty,
} = require("./task-11-advanced-js");

describe("Task 11: JavaScript - WeakMap, WeakSet, Symbol", () => {
  describe("createPrivateStorage", () => {
    test("stores values per instance and key", () => {
      const storage = createPrivateStorage();
      const userA = {};
      const userB = {};

      storage.set(userA, "name", "Alice");
      storage.set(userA, "age", 30);
      storage.set(userB, "name", "Bob");

      expect(storage.get(userA, "name")).toBe("Alice");
      expect(storage.get(userA, "age")).toBe(30);
      expect(storage.get(userB, "name")).toBe("Bob");
    });

    test("supports symbol keys and hides values from instance", () => {
      const storage = createPrivateStorage();
      const instance = {};
      const secretKey = Symbol("secret");

      storage.set(instance, secretKey, "hidden");

      expect(storage.get(instance, secretKey)).toBe("hidden");
      expect(storage.has(instance, secretKey)).toBe(true);
      expect(Object.prototype.hasOwnProperty.call(instance, "secret")).toBe(
        false,
      );
    });

    test("returns undefined/false for missing entries", () => {
      const storage = createPrivateStorage();
      const instance = {};

      expect(storage.get(instance, "missing")).toBeUndefined();
      expect(storage.has(instance, "missing")).toBe(false);
    });
  });

  describe("createWeakSetTracker", () => {
    test("tracks objects and reports their presence", () => {
      const tracker = createWeakSetTracker();
      const obj = {};
      const other = {};

      tracker.track(obj);

      expect(tracker.isTracked(obj)).toBe(true);
      expect(tracker.isTracked(other)).toBe(false);
    });

    test("counts tracked objects without double-counting", () => {
      const tracker = createWeakSetTracker();
      const first = {};
      const second = {};

      tracker.track(first);
      tracker.track(first);
      tracker.track(second);

      expect(tracker.getTrackedCount()).toBe(2);
    });
  });

  describe("createSymbolRegistry", () => {
    test("registers and returns symbols by name", () => {
      const registry = createSymbolRegistry();
      const token = registry.register("token");

      expect(typeof token).toBe("symbol");
      expect(registry.has("token")).toBe(true);
      expect(registry.get("token")).toBe(token);
    });

    test("returns existing symbol for the same name", () => {
      const registry = createSymbolRegistry();
      const first = registry.register("shared");
      const second = registry.register("shared");

      expect(first).toBe(second);
    });

    test("creates distinct symbols for different names", () => {
      const registry = createSymbolRegistry();
      const alpha = registry.register("alpha");
      const beta = registry.register("beta");

      expect(alpha).not.toBe(beta);
    });

    test("get/has behave for missing symbols", () => {
      const registry = createSymbolRegistry();

      expect(registry.get("missing")).toBeUndefined();
      expect(registry.has("missing")).toBe(false);
    });
  });

  describe("createPrivateMethod", () => {
    test("adds a symbol-keyed method and returns its key", () => {
      const obj = { value: 2 };
      const key = createPrivateMethod(obj, "double", function () {
        return this.value * 2;
      });

      expect(typeof key).toBe("symbol");
      expect(obj.double).toBeUndefined();
      expect(Object.getOwnPropertySymbols(obj)).toContain(key);
      expect(obj[key]()).toBe(4);
    });
  });

  describe("createObjectMemoizer", () => {
    test("caches results per object and args", () => {
      const calls = [];
      const fn = (obj, x, y) => {
        calls.push([obj, x, y]);
        return (obj.base || 0) + x + y;
      };
      const memoized = createObjectMemoizer(fn);

      const obj1 = { base: 10 };
      const obj2 = { base: 100 };

      expect(memoized(obj1, 1, 2)).toBe(13);
      expect(memoized(obj1, 1, 2)).toBe(13);
      expect(memoized(obj1, 2, 2)).toBe(14);
      expect(memoized(obj2, 1, 2)).toBe(103);

      expect(calls.length).toBe(3);
    });
  });

  describe("createSymbolProperty", () => {
    test("adds a non-enumerable symbol property and returns its key", () => {
      const obj = {};
      const key = createSymbolProperty(obj, "secret", 123);

      expect(typeof key).toBe("symbol");
      expect(obj.secret).toBeUndefined();
      expect(obj[key]).toBe(123);
      expect(Object.keys(obj)).toEqual([]);
      expect(Object.getOwnPropertySymbols(obj)).toContain(key);
    });
  });
});
