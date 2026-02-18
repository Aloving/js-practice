// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 28: Структуры данных — Trie (префиксное дерево), продвинутый уровень
 *
 * Реализуйте класс Trie для хранения строк с быстрым поиском по префиксу.
 *
 * Методы:
 * - insert(word) — добавить слово в дерево
 * - search(word) — вернуть true, если слово было добавлено (полное совпадение)
 * - startsWith(prefix) — вернуть true, если есть слово с таким префиксом
 * - getWordsWithPrefix(prefix) — вернуть массив всех слов, начинающихся с prefix
 *    (порядок не важен). Если prefix не найден — пустой массив.
 *
 * Символы — только строчные латинские буквы (a-z). word/prefix не пустые.
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

class TrieNode {
  constructor() {
    this.children = Object.create(null);
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return true;
  }

  getWordsWithPrefix(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return [];
      node = node.children[ch];
    }
    const result = [];
    const collect = (n, path) => {
      if (n.isEnd) result.push(path);
      for (const [c, child] of Object.entries(n.children)) collect(child, path + c);
    };
    collect(node, prefix);
    return result;
  }
}

module.exports = { Trie, TrieNode };
