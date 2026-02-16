// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 23: JavaScript - Intl и RegExp (интернационализация и регулярные выражения)
 *
 * Реализуйте функции:
 *
 * 1. formatCurrency(amount, locale, currency) - форматирует число amount как валюту
 *    с помощью Intl.NumberFormat. locale и currency — строки (например 'ru-RU', 'EUR').
 *    Возвращает строку (например "1 234,56 €").
 *
 * 2. formatDateTime(date, locale, options?) - форматирует date (Date или number)
 *    с помощью Intl.DateTimeFormat. options — опциональный объект с полями
 *    dateStyle, timeStyle и т.д. По умолчанию { dateStyle: 'short', timeStyle: 'short' }.
 *
 * 3. matchWithNamedGroups(regex, str) - выполняет regex над str. regex должен иметь
 *    named capture groups. Возвращает объект с полями для каждой named group (имена — ключи)
 *    или null, если совпадения нет. Пример: regex = /(?<year>\d{4})-(?<month>\d{2})/,
 *    str = '2025-02' -> { year: '2025', month: '02' }.
 *
 * 4. getMatchIndices(regex, str) - использует regex с флагом 'd' (hasIndices).
 *    Возвращает массив пар [start, end] для совпавшей подстроки и всех захваченных групп
 *    (в порядке: полное совпадение, группа 1, группа 2, ...). Если совпадения нет — null.
 *    Пример: для regex /a(b)c/d и str "xabc" -> [[1, 4], [2, 3]] (полное "abc", группа "b").
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

function formatCurrency(amount, locale, currency) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

function formatDateTime(date, locale, options = { dateStyle: 'short', timeStyle: 'short' }) {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(d);
}

function matchWithNamedGroups(regex, str) {
  const match = str.match(regex);
  if (!match || !match.groups) return null;
  return { ...match.groups };
}

function getMatchIndices(regex, str) {
  const match = str.match(regex);
  if (!match) return null;
  return match.indices ?? null;
}

module.exports = {
  formatCurrency,
  formatDateTime,
  matchWithNamedGroups,
  getMatchIndices,
};
