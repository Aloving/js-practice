// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 26: Алгоритмы — динамическое программирование (высокий уровень)
 *
 * 1. climbStairs(n) — лестница из n ступенек, за шаг можно 1 или 2 ступеньки.
 *    Сколькими способами можно подняться? Возвращает число.
 *
 * 2. coinChange(coins, amount) — минимальное число монет из массива coins для суммы amount.
 *    Если собрать нельзя — вернуть -1. Пример: coins = [1,2,5], amount = 11 → 3 (5+5+1).
 *
 * 3. longestIncreasingSubsequence(nums) — длина самой длинной строго возрастающей подпоследовательности.
 *    Пример: [10,9,2,5,3,7,101,18] → 4 (например 2,3,7,101).
 *
 * 4. maxSubArray(nums) — максимальная сумма непрерывного подмассива (Kadane).
 *    Пример: [-2,1,-3,4,-1,2,1,-5,4] → 6 (подмассив [4,-1,2,1]).
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

function climbStairs(n) {
  if (n <= 1) return 1;
  let a = 1;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    const next = a + b;
    a = b;
    b = next;
  }
  return b;
}

function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a >= c) dp[a] = Math.min(dp[a], 1 + dp[a - c]);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

function longestIncreasingSubsequence(nums) {
  if (nums.length === 0) return 0;
  const tails = [];
  for (const x of nums) {
    let left = 0;
    let right = tails.length;
    while (left < right) {
      const mid = (left + right) >> 1;
      if (tails[mid] < x) left = mid + 1;
      else right = mid;
    }
    if (left === tails.length) tails.push(x);
    else tails[left] = x;
  }
  return tails.length;
}

function maxSubArray(nums) {
  let maxSum = nums[0];
  let cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    maxSum = Math.max(maxSum, cur);
  }
  return maxSum;
}

module.exports = {
  climbStairs,
  coinChange,
  longestIncreasingSubsequence,
  maxSubArray,
};
