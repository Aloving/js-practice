// @no-ai-suggestions
// @disable-autocomplete

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ
// Определите здесь:
// - тип NonNullable<T>
// - функцию filterNulls<T>(items: T[]): NonNullable<T>[]
// - тип KeysOfType<T, U>
// - тип ReadonlyDeep<T>
// - функцию deepReadonly<T>(obj: T): ReadonlyDeep<T>
// - тип FunctionKeys<T>
// - функцию getFunctionKeys<T>(obj: T): Array<FunctionKeys<T>>

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
