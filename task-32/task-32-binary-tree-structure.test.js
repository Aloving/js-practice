// @no-ai-suggestions
// @disable-autocomplete
const { TreeNode, BinarySearchTree } = require('./task-32-binary-tree-structure');

describe('Task 32: Бинарное дерево — структура данных (BST)', () => {
  test('TreeNode создаёт узел с val, left, right', () => {
    const n = new TreeNode(5);
    expect(n.val).toBe(5);
    expect(n.left).toBeNull();
    expect(n.right).toBeNull();
  });

  test('BinarySearchTree insert и search', () => {
    const bst = new BinarySearchTree();
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    expect(bst.search(5)?.val).toBe(5);
    expect(bst.search(3)?.val).toBe(3);
    expect(bst.search(7)?.val).toBe(7);
    expect(bst.search(9)).toBeNull();
  });

  test('insert не добавляет дубликаты', () => {
    const bst = new BinarySearchTree();
    bst.insert(5);
    bst.insert(5);
    expect(bst.search(5)?.val).toBe(5);
    expect(bst.root.left).toBeNull();
    expect(bst.root.right).toBeNull();
  });

  test('min и max', () => {
    const bst = new BinarySearchTree();
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    bst.insert(1);
    expect(bst.min()).toBe(1);
    expect(bst.max()).toBe(7);
  });

  test('пустое дерево: min и max возвращают null', () => {
    const bst = new BinarySearchTree();
    expect(bst.min()).toBeNull();
    expect(bst.max()).toBeNull();
  });
});
