import { chunkArray } from "./task-interview-04-chunk-array";

describe("Task Interview 4: Chunk Array (TypeScript)", () => {
  test("разбивает массив на чанки заданного размера", () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  test("возвращает один чанк, если размер равен длине массива", () => {
    expect(chunkArray([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  });

  test("возвращает один чанк, если размер больше длины массива", () => {
    expect(chunkArray([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  test("возвращает пустой массив при size <= 0", () => {
    expect(chunkArray([1, 2, 3], 0)).toEqual([]);
    expect(chunkArray([1, 2, 3], -1)).toEqual([]);
  });

  test("не изменяет исходный массив", () => {
    const input = [1, 2, 3, 4];
    const copy = [...input];
    chunkArray(input, 2);
    expect(input).toEqual(copy);
  });
});
