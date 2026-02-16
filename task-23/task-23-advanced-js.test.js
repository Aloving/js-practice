// @no-ai-suggestions
// @disable-autocomplete
const {
  formatCurrency,
  formatDateTime,
  matchWithNamedGroups,
  getMatchIndices,
} = require('./task-23-advanced-js');

describe('Task 23: JavaScript - Intl и RegExp', () => {
  test('должен экспортировать все необходимые функции', () => {
    expect(typeof formatCurrency).toBe('function');
    expect(typeof formatDateTime).toBe('function');
    expect(typeof matchWithNamedGroups).toBe('function');
    expect(typeof getMatchIndices).toBe('function');
  });

  describe('formatCurrency', () => {
    test('форматирует число как валюту для локали', () => {
      const result = formatCurrency(1234.56, 'ru-RU', 'EUR');
      expect(typeof result).toBe('string');
      expect(result).toMatch(/\d/);
      expect(result).toMatch(/€|EUR|руб|₽|[\d\s,.]/);
    });

    test('для en-US и USD возвращает строку с $ или USD', () => {
      const result = formatCurrency(100, 'en-US', 'USD');
      expect(result).toMatch(/\$|USD|100/);
    });
  });

  describe('formatDateTime', () => {
    test('форматирует дату по умолчанию (short)', () => {
      const d = new Date(2025, 0, 15, 12, 30);
      const result = formatDateTime(d, 'ru-RU');
      expect(typeof result).toBe('string');
      expect(result).toMatch(/\d/);
    });

    test('принимает options', () => {
      const d = new Date(2025, 0, 15);
      const result = formatDateTime(d, 'en-US', { dateStyle: 'long' });
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(5);
    });
  });

  describe('matchWithNamedGroups', () => {
    test('возвращает объект с named groups', () => {
      const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
      const result = matchWithNamedGroups(regex, '2025-02-16');
      expect(result).toEqual({ year: '2025', month: '02', day: '16' });
    });

    test('возвращает null при отсутствии совпадения', () => {
      const regex = /(?<x>\d+)/;
      expect(matchWithNamedGroups(regex, 'abc')).toBeNull();
    });
  });

  describe('getMatchIndices', () => {
    test('возвращает индексы полного совпадения и групп для regex с флагом d', () => {
      const regex = /a(b)c/d;
      const result = getMatchIndices(regex, 'xabcy');
      expect(Array.isArray(result)).toBe(true);
      expect(result[0][0]).toBe(1);
      expect(result[0][1]).toBe(4);
      expect(result[1][0]).toBe(2);
      expect(result[1][1]).toBe(3);
    });

    test('возвращает null при отсутствии совпадения', () => {
      const regex = /a(b)c/d;
      expect(getMatchIndices(regex, 'xyz')).toBeNull();
    });
  });
});
