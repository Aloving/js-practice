// @no-ai-suggestions
// @disable-autocomplete
const {
  climbStairs,
  coinChange,
  longestIncreasingSubsequence,
  maxSubArray,
} = require('./task-26-algorithms-dp');

describe('Task 26: Алгоритмы — динамическое программирование', () => {
  test('экспортирует все функции', () => {
    expect(typeof climbStairs).toBe('function');
    expect(typeof coinChange).toBe('function');
    expect(typeof longestIncreasingSubsequence).toBe('function');
    expect(typeof maxSubArray).toBe('function');
  });

  describe('climbStairs', () => {
    test('n=2 → 2 способа', () => expect(climbStairs(2)).toBe(2));
    test('n=3 → 3 способа', () => expect(climbStairs(3)).toBe(3));
    test('n=1 → 1', () => expect(climbStairs(1)).toBe(1));
  });

  describe('coinChange', () => {
    test('минимальное число монет', () => {
      expect(coinChange([1, 2, 5], 11)).toBe(3);
    });
    test('невозможно → -1', () => {
      expect(coinChange([2], 3)).toBe(-1);
    });
    test('amount=0 → 0', () => expect(coinChange([1], 0)).toBe(0));
  });

  describe('longestIncreasingSubsequence', () => {
    test('длина НВП', () => {
      expect(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
    });
    test('пустой массив → 0', () => expect(longestIncreasingSubsequence([])).toBe(0));
  });

  describe('maxSubArray', () => {
    test('максимальная сумма подмассива', () => {
      expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    });
    test('один элемент', () => expect(maxSubArray([5])).toBe(5));
  });
});
