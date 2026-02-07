// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 13: TypeScript - Template Literal Types и String Manipulation (Средний-продвинутый уровень)
 *
 * Реализуйте типы и функции с использованием Template Literal Types:

1. Создайте тип Join<T extends string[], D extends string> который объединяет строки массива
   с разделителем D

2. Создайте тип Split<S extends string, D extends string> который разбивает строку S
   по разделителю D

3. Создайте тип CapitalizeWords<S extends string> который делает первую букву каждого слова заглавной

4. Создайте тип CamelCase<S extends string> который преобразует строку в camelCase
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

type Join<T extends string[], D extends string> = T extends [
  infer F extends string,
  ...infer R extends [],
]
  ? R extends []
    ? F
    : `${F}${D}${Join<R, D>}`
  : "";

type Split<S extends string, D extends string> = S extends ""
  ? []
  : S extends `${infer F}${D}${infer R}`
    ? [F, ...Split<R, D>]
    : [S];
