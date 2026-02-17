// @no-ai-suggestions
// @disable-autocomplete
const {
  maxSumSubarray,
  lengthOfLongestSubstring,
  twoSumSorted,
  minSubArrayLen,
} = require('./task-25-algorithms-sliding-window');

describe('Task 25: Алгоритмы — скользящее окно и два указателя', () => {
  test('экспортирует все функции', () => {
    expect(typeof maxSumSubarray).toBe('function');
    expect(typeof lengthOfLongestSubstring).toBe('function');
    expect(typeof twoSumSorted).toBe('function');
    expect(typeof minSubArrayLen).toBe('function');
  });

  describe('maxSumSubarray', () => {
    test('возвращает максимальную сумму подмассива длины k', () => {
      expect(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)).toBe(9);
    });
    test('массив короче k → 0', () => {
      expect(maxSumSubarray([1, 2], 5)).toBe(0);
    });
  });

  describe('lengthOfLongestSubstring', () => {
    test('длина самой длинной подстроки без повторов', () => {
      expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
      expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
    });
    test('пустая строка → 0', () => {
      expect(lengthOfLongestSubstring('')).toBe(0);
    });
  });

  describe('twoSumSorted', () => {
    test('возвращает пару индексов с суммой target', () => {
      expect(twoSumSorted([2, 7, 11, 15], 9)).toEqual([0, 1]);
    });
    test('возвращает null если решения нет', () => {
      expect(twoSumSorted([1, 2, 3], 10)).toBeNull();
    });
  });

  describe('minSubArrayLen', () => {
    test('минимальная длина подмассива с суммой >= target', () => {
      expect(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])).toBe(2);
    });
    test('нет подмассива → 0', () => {
      expect(minSubArrayLen(100, [1, 2, 3])).toBe(0);
    });
  });
});
