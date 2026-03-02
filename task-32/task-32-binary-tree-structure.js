// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 32: Бинарное дерево — структура данных (продвинутый уровень)
 *
 * Реализуйте BST (Binary Search Tree) — дерево поиска: левый потомок < корень < правый.
 *
 * 1. class TreeNode { constructor(val, left, right) } — узел с полями val, left, right.
 *
 * 2. class BinarySearchTree с методом root (геттер корня):
 *    - insert(val) — вставить значение в дерево, сохраняя BST
 *    - search(val) — вернуть узел с val или null
 *    - min() — минимальное значение в дереве (null если пусто)
 *    - max() — максимальное значение (null если пусто)
 *
 * Дубликаты не добавлять (insert ничего не делает, если val уже есть).
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  get root() {
    return this._root;
  }

  insert(val) {
    const node = new TreeNode(val);
    if (!this._root) {
      this._root = node;
      return;
    }
    let curr = this._root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) {
          curr.left = node;
          return;
        }
        curr = curr.left;
      } else if (val > curr.val) {
        if (!curr.right) {
          curr.right = node;
          return;
        }
        curr = curr.right;
      } else {
        return;
      }
    }
  }

  search(val) {
    let curr = this._root;
    while (curr) {
      if (val === curr.val) return curr;
      if (val < curr.val) curr = curr.left;
      else curr = curr.right;
    }
    return null;
  }

  min() {
    if (!this._root) return null;
    let curr = this._root;
    while (curr.left) curr = curr.left;
    return curr.val;
  }

  max() {
    if (!this._root) return null;
    let curr = this._root;
    while (curr.right) curr = curr.right;
    return curr.val;
  }
}

module.exports = { TreeNode, BinarySearchTree };
