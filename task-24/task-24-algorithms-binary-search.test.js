// @no-ai-suggestions
// @disable-autocomplete
const {
  binarySearch,
  findFirst,
  findLast,
  searchInRotatedSorted,
} = require("./task-24-algorithms-binary-search");

describe("Task 24: Алгоритмы — бинарный поиск", () => {
  test("экспортирует все функции", () => {
    expect(typeof binarySearch).toBe("function");
    expect(typeof findFirst).toBe("function");
    expect(typeof findLast).toBe("function");
    expect(typeof searchInRotatedSorted).toBe("function");
  });

  describe("binarySearch", () => {
    test("находит элемент в середине", () => {
      console.log(
        "binarySearch([1, 2, 3, 4, 5], 3)",
        binarySearch([1, 2, 3, 4, 5], 3)
      );
      expect(binarySearch([1, 2, 3, 4, 5], 3)).toBe(2);
    });
    test("возвращает -1 если не найден", () => {
      expect(binarySearch([1, 2, 4, 5], 3)).toBe(-1);
    });
    test("работает с одним элементом", () => {
      expect(binarySearch([7], 7)).toBe(0);
      expect(binarySearch([7], 8)).toBe(-1);
    });
  });

  describe("findFirst", () => {
    test("возвращает индекс первого вхождения", () => {
      expect(findFirst([1, 2, 2, 2, 3], 2)).toBe(1);
    });
    test("возвращает -1 если не найден", () => {
      expect(findFirst([1, 2, 3], 4)).toBe(-1);
    });
  });

  describe("findLast", () => {
    test("возвращает индекс последнего вхождения", () => {
      expect(findLast([1, 2, 2, 2, 3], 2)).toBe(3);
    });
    test("возвращает -1 если не найден", () => {
      expect(findLast([1, 2, 3], 0)).toBe(-1);
    });
  });

  describe("searchInRotatedSorted", () => {
    test("находит в сдвинутом массиве", () => {
      expect(searchInRotatedSorted([4, 5, 6, 0, 1, 2, 3], 0)).toBe(3);
      expect(searchInRotatedSorted([4, 5, 6, 0, 1, 2, 3], 5)).toBe(1);
    });
    test("возвращает -1 если не найден", () => {
      expect(searchInRotatedSorted([4, 5, 6, 0, 1, 2, 3], 7)).toBe(-1);
    });
    test("работает без сдвига", () => {
      expect(searchInRotatedSorted([1, 2, 3], 2)).toBe(1);
    });
  });
});
