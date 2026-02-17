// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 24: Алгоритмы — бинарный поиск (средний уровень)
 *
 * 1. binarySearch(sortedArray, target) — классический бинарный поиск в отсортированном
 *    массиве. Возвращает индекс target или -1, если не найден.
 *
 * 2. findFirst(sortedArray, target) — индекс первого вхождения target в отсортированном
 *    массиве (могут быть дубликаты). -1 если не найден.
 *
 * 3. findLast(sortedArray, target) — индекс последнего вхождения target. -1 если не найден.
 *
 * 4. searchInRotatedSorted(nums, target) — поиск в «сломанном» отсортированном массиве:
 *    массив был отсортирован, затем сдвинут (например [4,5,6,0,1,2,3]). Вернуть индекс
 *    target или -1. Сложность O(log n).
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

function binarySearch(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (sortedArray[mid] === target) return mid;
    if (sortedArray[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function findFirst(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;
  let result = -1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (sortedArray[mid] === target) {
      result = mid;
      right = mid - 1;
    } else if (sortedArray[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return result;
}

function findLast(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;
  let result = -1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (sortedArray[mid] === target) {
      result = mid;
      left = mid + 1;
    } else if (sortedArray[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return result;
}

function searchInRotatedSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (target > nums[mid] && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}

module.exports = {
  binarySearch,
  findFirst,
  findLast,
  searchInRotatedSorted,
};
