// @no-ai-suggestions
// @disable-autocomplete
/*
 * ЗАДАЧА 8: TypeScript - Условные типы и Mapped Types (Средний-продвинутый уровень)
 *
 * Реализуйте функции с использованием условных типов и mapped types:
 *
 * 1. Создайте условный тип NonNullable<T>, который исключает null и undefined из типа T
 *    Используйте его в функции filterNulls<T>(items: T[]): NonNullable<T>[]
 *
 * 2. Реализуйте условный тип KeysOfType<T, U>, который возвращает ключи объекта T,
 *    значения которых имеют тип U
 *
 * 3. Создайте mapped type ReadonlyDeep<T>, который делает все свойства объекта readonly рекурсивно
 *
 * 4. Реализуйте generic функцию deepReadonly<T>(obj: T): ReadonlyDeep<T>
 *    которая создает глубоко readonly копию объекта
 *
 * 5. Создайте условный тип FunctionKeys<T>, который возвращает ключи объекта T,
 *    значения которых являются функциями
 *
 * 6. Реализуйте generic функцию getFunctionKeys<T>(obj: T): Array<FunctionKeys<T>>
 *    которая возвращает массив ключей, значения которых являются функциями
 *
 * Примеры:
 * interface Config {
 *     apiUrl: string;
 *     timeout: number;
 *     retry: () => void;
 *     validate: (value: string) => boolean;
 * }
 *
 * type ConfigFunctionKeys = FunctionKeys<Config>; // 'retry' | 'validate'
 * const keys = getFunctionKeys(config); // ['retry', 'validate']
 *
 * const readonlyConfig = deepReadonly(config);
 * readonlyConfig.apiUrl = 'new'; // ошибка компиляции
 */

import { ReadonlyDeep } from "./task-08-typescript-no-types";

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ
// Определите здесь:
// - тип NonNullable<T>
// - функцию filterNulls<T>(items: T[]): NonNullable<T>[]
// - тип KeysOfType<T, U>
// - тип ReadonlyDeep<T>
// - функцию deepReadonly<T>(obj: T): ReadonlyDeep<T>
// - тип FunctionKeys<T>
// - функцию getFunctionKeys<T>(obj: T): Array<FunctionKeys<T>>

type NonNullable<T> = T extends null | undefined ? never : T;
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
type ReadonlyDeep<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends (...args: any[]) => any
      ? T[P]
      : ReadonlyDeep<T[P]>
    : T[P];
};

type FunctionKeys<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined> extends (...args: any[]) => any
    ? K
    : never;
}[keyof T];

const filterNulls = <T>(items: T[]): NonNullable<T>[] => {
  return items.filter((item) => item) as NonNullable<T>[];
};

const deepReadonly = <T>(obj: T): ReadonlyDeep<T> => {
  return Object.freeze(obj);
};

const getFunctionKeys = <T extends object>(obj: T): Array<FunctionKeys<T>> => {
  return Object.entries(obj)
    .filter(([key, value]) => typeof value === "function")
    .map(([key, value]) => key as FunctionKeys<T>);
};

// Тесты для проверки
interface Config {
  apiUrl: string;
  timeout: number;
  retry: () => void;
  validate: (value: string) => boolean;
  onSuccess?: () => void;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retry: () => console.log("retry"),
  validate: (value: string) => value.length > 0,
};

const mixed = [1, 2, null, undefined, "hello", 3];
const filtered = filterNulls(mixed);
console.log("Тест 1:", filtered.length === 4);
console.log(
  "Тест 2:",
  filtered.every((item) => item !== null && item !== undefined)
);

const functionKeys = getFunctionKeys(config);
console.log("Тест 3:", functionKeys.includes("retry"));
console.log("Тест 4:", functionKeys.includes("validate"));
console.log("Тест 5:", !functionKeys.includes("apiUrl"));

const readonlyConfig = deepReadonly(config);
console.log("Тест 6:", readonlyConfig.apiUrl === config.apiUrl);
// readonlyConfig.apiUrl = 'new'; // должно вызывать ошибку компиляции

export {
  filterNulls,
  KeysOfType,
  ReadonlyDeep,
  deepReadonly,
  FunctionKeys,
  getFunctionKeys,
};
