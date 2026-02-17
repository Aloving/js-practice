// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 25: Алгоритмы — скользящее окно и два указателя (средний уровень)
 *
 * 1. maxSumSubarray(arr, k) — максимальная сумма подмассива фиксированной длины k.
 *    Возвращает сумму (число). Пример: arr = [2, 1, 5, 1, 3, 2], k = 3 → 5+1+3 = 9.
 *
 * 2. lengthOfLongestSubstring(s) — длина самой длинной подстроки без повторяющихся символов.
 *    Пример: "abcabcbb" → 3 ("abc"), "bbbbb" → 1.
 *
 * 3. twoSumSorted(arr, target) — в отсортированном массиве найти два числа, сумма которых target.
 *    Вернуть пару индексов [i, j] или null. Ровно одно решение гарантируется.
 *
 * 4. minSubArrayLen(target, nums) — минимальная длина подмассива с суммой >= target.
 *    Если такого нет — 0. Пример: target = 7, nums = [2,3,1,2,4,3] → 2 ([4,3]).
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

function maxSumSubarray(arr, k) {
  if (arr.length < k) return 0;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let maxSum = sum;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
}

function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0;
  let maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

function twoSumSorted(arr, target) {
  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    const sum = arr[i] + arr[j];
    if (sum === target) return [i, j];
    if (sum < target) i++;
    else j--;
  }
  return null;
}

function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}

module.exports = {
  maxSumSubarray,
  lengthOfLongestSubstring,
  twoSumSorted,
  minSubArrayLen,
};
