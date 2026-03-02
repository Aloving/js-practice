// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 33: Бинарное дерево — алгоритмы (продвинутый уровень)
 *
 * Функции принимают корень (TreeNode или null). Структура: { val, left, right }.
 *
 * 1. inorder(root) — обход «левый-корень-правый», вернуть массив значений
 * 2. preorder(root) — «корень-левый-правый»
 * 3. postorder(root) — «левый-правый-корень»
 * 4. maxDepth(root) — максимальная глубина (пустое дерево → 0, один узел → 1)
 * 5. isBalanced(root) — сбалансировано ли дерево: для каждого узла |depth(left)-depth(right)| <= 1
 * 6. isBST(root) — является ли деревом поиска (левые < корень < правые для всех узлов)
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

function inorder(root) {
  const result = [];
  const walk = (node) => {
    if (!node) return;
    walk(node.left);
    result.push(node.val);
    walk(node.right);
  };
  walk(root);
  return result;
}

function preorder(root) {
  const result = [];
  const walk = (node) => {
    if (!node) return;
    result.push(node.val);
    walk(node.left);
    walk(node.right);
  };
  walk(root);
  return result;
}

function postorder(root) {
  const result = [];
  const walk = (node) => {
    if (!node) return;
    walk(node.left);
    walk(node.right);
    result.push(node.val);
  };
  walk(root);
  return result;
}

function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function isBalanced(root) {
  const check = (node) => {
    if (!node) return [true, 0];
    const [leftOk, leftD] = check(node.left);
    const [rightOk, rightD] = check(node.right);
    const balanced = leftOk && rightOk && Math.abs(leftD - rightD) <= 1;
    const depth = 1 + Math.max(leftD, rightD);
    return [balanced, depth];
  };
  return check(root)[0];
}

function isBST(root) {
  const check = (node, lo, hi) => {
    if (!node) return true;
    if (lo != null && node.val <= lo) return false;
    if (hi != null && node.val >= hi) return false;
    return check(node.left, lo, node.val) && check(node.right, node.val, hi);
  };
  return check(root, null, null);
}

module.exports = {
  inorder,
  preorder,
  postorder,
  maxDepth,
  isBalanced,
  isBST,
};
