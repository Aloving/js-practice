// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 34: JavaScript — Tagged Template Literals (продвинутый уровень)
 *
 * Реализуйте функции-теги для шаблонных строк (tagged templates).
 *
 * 1. html(strings, ...values) — тег для безопасного HTML: экранирует значения
 *    (заменяет < > & " ' на &lt; &gt; &amp; &quot; &#39;). Возвращает строку.
 *
 * 2. sql(strings, ...values) — тег для «безопасных» SQL: экранирует одиночные кавычки
 *    в значениях (заменяет ' на ''). Возвращает строку.
 *
 * 3. upper(strings, ...values) — тег, который переводит все значения в верхний регистр.
 *    strings остаются без изменений.
 *
 * Пример:
 *   html`Hello, ${name}!`  → "Hello, &lt;script&gt;..."
 *   sql`SELECT * FROM users WHERE name = ${name}`  → экранирует name
 *   upper`hello ${"world"}`  → "hello WORLD"
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

function html(strings, ...values) {
  const escape = (s) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  return strings.reduce((acc, str, i) => acc + str + (i < values.length ? escape(values[i]) : ''), '');
}

function sql(strings, ...values) {
  const escape = (s) => String(s).replace(/'/g, "''");
  return strings.reduce((acc, str, i) => acc + str + (i < values.length ? escape(values[i]) : ''), '');
}

function upper(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (i < values.length ? String(values[i]).toUpperCase() : ''), '');
}

module.exports = { html, sql, upper };
