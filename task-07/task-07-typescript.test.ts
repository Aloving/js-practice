import {
  identity,
  pick,
  omit,
  partial,
  mapObject,
} from "./task-07-typescript-no-types";

describe("Task 7: TypeScript - Generics и Utility Types", () => {
  interface User {
    id: number;
    name: string;
    email: string;
    age: number;
  }

  const user: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    age: 25,
  };

  describe("identity", () => {
    test("должна возвращать переданное значение без изменений", () => {
      expect(identity(42)).toBe(42);
      expect(identity("hello")).toBe("hello");
      expect(identity(true)).toBe(true);
    });

    test("должна работать с объектами", () => {
      const obj = { a: 1, b: 2 };
      expect(identity(obj)).toBe(obj);
      expect(identity(obj)).toEqual(obj);
    });

    test("должна сохранять тип", () => {
      const result = identity<string>("test");
      expect(typeof result).toBe("string");
    });
  });

  describe("pick", () => {
    test("должна выбирать указанные свойства из объекта", () => {
      const result = pick(user, ["name", "email"]);
      expect(result).toEqual({
        name: "Alice",
        email: "alice@example.com",
      });
      expect("id" in result).toBe(false);
      expect("age" in result).toBe(false);
    });

    test("должна работать с одним свойством", () => {
      const result = pick(user, ["id"]);
      expect(result).toEqual({ id: 1 });
    });

    test("должна возвращать пустой объект для пустого массива ключей", () => {
      const result = pick(user, []);
      expect(result).toEqual({});
    });

    test("должна сохранять типы выбранных свойств", () => {
      const result = pick(user, ["name", "age"]);
      expect(typeof result.name).toBe("string");
      expect(typeof result.age).toBe("number");
    });
  });

  describe("omit", () => {
    test("должна исключать указанные свойства из объекта", () => {
      const result = omit(user, ["age"]);
      expect(result).toEqual({
        id: 1,
        name: "Alice",
        email: "alice@example.com",
      });
      expect("age" in result).toBe(false);
    });

    test("должна работать с несколькими свойствами", () => {
      const result = omit(user, ["id", "age"]);
      expect(result).toEqual({
        name: "Alice",
        email: "alice@example.com",
      });
    });

    test("должна возвращать весь объект для пустого массива ключей", () => {
      const result = omit(user, []);
      expect(result).toEqual(user);
    });

    test("должна сохранять типы оставшихся свойств", () => {
      const result = omit(user, ["age"]);
      expect(typeof result.id).toBe("number");
      expect(typeof result.name).toBe("string");
      expect(typeof result.email).toBe("string");
    });
  });

  describe("partial", () => {
    test("должна делать все свойства объекта опциональными", () => {
      const result = partial(user);
      expect(result).toEqual(user);

      // Проверяем, что все свойства могут быть undefined
      const partialUser: Partial<User> = {
        name: "Bob",
      };
      expect(partialUser.name).toBe("Bob");
      expect(partialUser.age).toBeUndefined();
    });

    test("должна возвращать объект с теми же значениями", () => {
      const result = partial(user);
      expect(result.id).toBe(1);
      expect(result.name).toBe("Alice");
      expect(result.email).toBe("alice@example.com");
      expect(result.age).toBe(25);
    });

    test("должна работать с разными типами объектов", () => {
      interface Product {
        id: string;
        price: number;
      }
      const product: Product = { id: "p1", price: 100 };
      const result = partial(product);
      expect(result.id).toBe("p1");
      expect(result.price).toBe(100);
    });
  });

  describe("mapObject", () => {
    test("должна применять mapper к каждому значению объекта", () => {
      const input = { a: 1, b: 2, c: 3 };
      const result = mapObject(input, (x) => x * 2);
      expect(result).toEqual({ a: 2, b: 4, c: 6 });
    });

    test("должна работать с разными типами значений", () => {
      const input = { x: "hello", y: "world" };
      const result = mapObject(input, (str) => str.toUpperCase());
      expect(result).toEqual({ x: "HELLO", y: "WORLD" });
    });

    test("должна сохранять ключи объекта", () => {
      const input = { a: 1, b: 2 };
      const result = mapObject(input, (x) => x * 2);
      expect(Object.keys(result)).toEqual(["a", "b"]);
    });

    test("должна работать с пустым объектом", () => {
      const input = {};
      const result = mapObject(input, (x) => x);
      expect(result).toEqual({});
    });

    test("должна работать с разными типами возвращаемых значений", () => {
      const input = { a: 1, b: 2 };
      const result = mapObject(input, (x) => `value: ${x}`);
      expect(result.a).toBe("value: 1");
      expect(result.b).toBe("value: 2");
    });
  });
});
