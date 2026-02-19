// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 30: Структуры данных — Disjoint Set (Union-Find), продвинутый уровень
 *
 * Реализуйте класс DisjointSet для непересекающихся множеств с эвристиками.
 *
 * Методы:
 * - makeSet(x) — создать множество из одного элемента x (если уже есть — ничего)
 * - find(x) — вернуть представителя множества, содержащего x (path compression)
 * - union(x, y) — объединить множества, содержащие x и y (union by rank)
 * - areConnected(x, y) — true, если x и y в одном множестве
 *
 * Ключи x, y — любые (строка, число). Используйте Map для хранения.
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

class DisjointSet {
  constructor() {
    this.parent = new Map();
    this.rank = new Map();
  }

  makeSet(x) {
    if (!this.parent.has(x)) {
      this.parent.set(x, x);
      this.rank.set(x, 0);
    }
  }

  find(x) {
    if (!this.parent.has(x)) return undefined;
    if (this.parent.get(x) !== x) {
      this.parent.set(x, this.find(this.parent.get(x)));
    }
    return this.parent.get(x);
  }

  union(x, y) {
    const px = this.find(x);
    const py = this.find(y);
    if (px === undefined || py === undefined || px === py) return;
    const rx = this.rank.get(px);
    const ry = this.rank.get(py);
    if (rx < ry) {
      this.parent.set(px, py);
    } else if (rx > ry) {
      this.parent.set(py, px);
    } else {
      this.parent.set(py, px);
      this.rank.set(px, rx + 1);
    }
  }

  areConnected(x, y) {
    const px = this.find(x);
    const py = this.find(y);
    return px !== undefined && px === py;
  }
}

module.exports = { DisjointSet };
