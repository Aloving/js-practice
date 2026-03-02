// @no-ai-suggestions
// @disable-autocomplete
const {
  inorder,
  preorder,
  postorder,
  maxDepth,
  isBalanced,
  isBST,
} = require('./task-33-binary-tree-algorithms');
const { TreeNode } = require('../task-32/task-32-binary-tree-structure');

const tree = (val, left, right) => new TreeNode(val, left, right);

describe('Task 33: Бинарное дерево — алгоритмы', () => {
  test('экспортирует все функции', () => {
    expect(typeof inorder).toBe('function');
    expect(typeof preorder).toBe('function');
    expect(typeof postorder).toBe('function');
    expect(typeof maxDepth).toBe('function');
    expect(typeof isBalanced).toBe('function');
    expect(typeof isBST).toBe('function');
  });

  describe('обходы', () => {
    test('inorder: левый-корень-правый', () => {
      const root = tree(4, tree(2, tree(1), tree(3)), tree(6, tree(5), tree(7)));
      expect(inorder(root)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
    test('preorder: корень-левый-правый', () => {
      const root = tree(4, tree(2), tree(6));
      expect(preorder(root)).toEqual([4, 2, 6]);
    });
    test('postorder: левый-правый-корень', () => {
      const root = tree(4, tree(2), tree(6));
      expect(postorder(root)).toEqual([2, 6, 4]);
    });
    test('пустое дерево → []', () => {
      expect(inorder(null)).toEqual([]);
      expect(preorder(null)).toEqual([]);
      expect(postorder(null)).toEqual([]);
    });
  });

  describe('maxDepth', () => {
    test('глубина дерева', () => {
      expect(maxDepth(null)).toBe(0);
      expect(maxDepth(tree(1))).toBe(1);
      expect(maxDepth(tree(1, tree(2), null))).toBe(2);
      expect(maxDepth(tree(1, tree(2, tree(3), null), null))).toBe(3);
    });
  });

  describe('isBalanced', () => {
    test('сбалансированное дерево', () => {
      const root = tree(4, tree(2), tree(6));
      expect(isBalanced(root)).toBe(true);
    });
    test('несбалансированное: разница глубин > 1', () => {
      const root = tree(1, tree(2, tree(3, tree(4), null), null), null);
      expect(isBalanced(root)).toBe(false);
    });
  });

  describe('isBST', () => {
    test('валидное BST', () => {
      const root = tree(4, tree(2, tree(1), tree(3)), tree(6));
      expect(isBST(root)).toBe(true);
    });
    test('не BST: левый потомок больше корня', () => {
      const root = tree(2, tree(5), tree(3));
      expect(isBST(root)).toBe(false);
    });
  });
});
