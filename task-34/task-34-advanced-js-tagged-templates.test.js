// @no-ai-suggestions
// @disable-autocomplete
const { html, sql, upper } = require('./task-34-advanced-js-tagged-templates');

describe('Task 34: Tagged Template Literals', () => {
  test('экспортирует html, sql, upper', () => {
    expect(typeof html).toBe('function');
    expect(typeof sql).toBe('function');
    expect(typeof upper).toBe('function');
  });

  describe('html', () => {
    test('экранирует < > & в значениях', () => {
      const result = html`Hello, ${'<script>alert(1)</script>'}!`;
      expect(result).toBe('Hello, &lt;script&gt;alert(1)&lt;/script&gt;!');
    });
    test('экранирует кавычки', () => {
      const result = html`value="${'"'}${'test"x"'}`;
      expect(result).toContain('&quot;');
    });
  });

  describe('sql', () => {
    test('экранирует одиночные кавычки', () => {
      const name = "O'Brien";
      const result = sql`SELECT * FROM users WHERE name = '${name}'`;
      expect(result).toContain("''");
    });
  });

  describe('upper', () => {
    test('переводит значения в верхний регистр', () => {
      const result = upper`hello ${'world'}`;
      expect(result).toBe('hello WORLD');
    });
  });
});
