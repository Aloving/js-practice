import { findTwoSumIndices } from "./task-interview-03-two-sum";

describe("Task Interview 3: Two Sum (TypeScript)", () => {
  test("находит индексы для простой пары", () => {
    expect(findTwoSumIndices([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  test("работает с несортированным массивом", () => {
    expect(findTwoSumIndices([3, 2, 4], 6)).toEqual([1, 2]);
  });

  test("обрабатывает дубликаты", () => {
    expect(findTwoSumIndices([3, 3], 6)).toEqual([0, 1]);
  });

  test("возвращает null, если пары нет", () => {
    expect(findTwoSumIndices([1, 2, 3], 10)).toBeNull();
  });

  test("не изменяет исходный массив", () => {
    const input = [1, 5, 9, 2];
    const copy = [...input];
    findTwoSumIndices(input, 11);
    expect(input).toEqual(copy);
  });
});
