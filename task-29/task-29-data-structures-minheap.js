// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 29: Структуры данных — Min-Heap (куча минимума), продвинутый уровень
 *
 * Реализуйте класс MinHeap для минимум-кучи (родитель не больше детей).
 * Элементы — числа. При равенстве порядок не важен.
 *
 * Методы:
 * - insert(value) — добавить элемент, сохраняя свойство кучи
 * - extractMin() — удалить и вернуть минимальный элемент; если куча пуста — вернуть undefined
 * - peek() — вернуть минимальный элемент без удаления; пустая куча — undefined
 * - size() — текущее количество элементов
 *
 * Внутреннее хранение — массив (индексация с 0: дети 2*i+1, 2*i+2; родитель (i-1)>>1).
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

class MinHeap {
  constructor() {
    this._heap = [];
  }

  size() {
    return this._heap.length;
  }

  peek() {
    return this._heap.length ? this._heap[0] : undefined;
  }

  insert(value) {
    this._heap.push(value);
    this._bubbleUp(this._heap.length - 1);
  }

  extractMin() {
    if (this._heap.length === 0) return undefined;
    const min = this._heap[0];
    const last = this._heap.pop();
    if (this._heap.length > 0) {
      this._heap[0] = last;
      this._bubbleDown(0);
    }
    return min;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this._heap[parent] <= this._heap[i]) break;
      [this._heap[parent], this._heap[i]] = [this._heap[i], this._heap[parent]];
      i = parent;
    }
  }

  _bubbleDown(i) {
    const n = this._heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this._heap[left] < this._heap[smallest]) smallest = left;
      if (right < n && this._heap[right] < this._heap[smallest]) smallest = right;
      if (smallest === i) break;
      [this._heap[i], this._heap[smallest]] = [this._heap[smallest], this._heap[i]];
      i = smallest;
    }
  }
}

module.exports = { MinHeap };
