// @no-ai-suggestions
// @disable-autocomplete
const { Trie } = require('./task-28-data-structures-trie');

describe('Task 28: Trie (префиксное дерево)', () => {
  test('экспортирует Trie', () => {
    expect(typeof Trie).toBe('function');
  });

  test('insert и search: слово найдено после добавления', () => {
    const trie = new Trie();
    trie.insert('apple');
    expect(trie.search('apple')).toBe(true);
    expect(trie.search('app')).toBe(false);
  });

  test('startsWith: префикс есть', () => {
    const trie = new Trie();
    trie.insert('apple');
    expect(trie.startsWith('app')).toBe(true);
    expect(trie.startsWith('apl')).toBe(false);
  });

  test('getWordsWithPrefix: все слова с префиксом', () => {
    const trie = new Trie();
    trie.insert('apple');
    trie.insert('app');
    trie.insert('apply');
    trie.insert('banana');
    const words = trie.getWordsWithPrefix('app');
    expect(words.sort()).toEqual(['app', 'apple', 'apply'].sort());
  });

  test('getWordsWithPrefix: неизвестный префикс → []', () => {
    const trie = new Trie();
    trie.insert('test');
    expect(trie.getWordsWithPrefix('xyz')).toEqual([]);
  });
});
