import { filterNulls, KeysOfType, ReadonlyDeep, deepReadonly, FunctionKeys, getFunctionKeys } from './task-08-typescript';

describe('Task 8: TypeScript - Условные типы и Mapped Types', () => {
    interface Config {
        apiUrl: string;
        timeout: number;
        retry: () => void;
        validate: (value: string) => boolean;
        onSuccess?: () => void;
    }

    const config: Config = {
        apiUrl: 'https://api.example.com',
        timeout: 5000,
        retry: () => console.log('retry'),
        validate: (value: string) => value.length > 0,
        onSuccess: () => console.log('success')
    };

    describe('filterNulls', () => {
        test('должна фильтровать null и undefined значения', () => {
            const mixed = [1, 2, null, undefined, 'hello', 3, null];
            const result = filterNulls(mixed);
            
            expect(result.length).toBe(4);
            expect(result).toEqual([1, 2, 'hello', 3]);
            expect(result.every(item => item !== null && item !== undefined)).toBe(true);
        });

        test('должна возвращать пустой массив для массива только с null и undefined', () => {
            const result = filterNulls([null, undefined, null]);
            expect(result).toEqual([]);
        });

        test('должна сохранять типы элементов', () => {
            const mixed: (string | number | null | undefined)[] = ['a', 1, null, 'b'];
            const result = filterNulls(mixed);
            
            expect(result.length).toBe(3);
            expect(typeof result[0]).toBe('string');
            expect(typeof result[1]).toBe('number');
            expect(typeof result[2]).toBe('string');
        });

        test('должна работать с объектами', () => {
            const obj1 = { a: 1 };
            const obj2 = { b: 2 };
            const mixed = [obj1, null, obj2, undefined];
            const result = filterNulls(mixed);
            
            expect(result.length).toBe(2);
            expect(result[0]).toBe(obj1);
            expect(result[1]).toBe(obj2);
        });
    });

    describe('KeysOfType', () => {
        test('должна возвращать ключи с определенным типом значения', () => {
            // Тестируем на уровне типов через функцию
            const getStringKeys = <T>(obj: T): Array<KeysOfType<T, string>> => {
                return Object.keys(obj).filter(
                    key => typeof (obj as any)[key] === 'string'
                ) as Array<KeysOfType<T, string>>;
            };

            const stringKeys = getStringKeys(config);
            expect(stringKeys).toContain('apiUrl');
            expect(stringKeys.length).toBe(1);
        });
    });

    describe('deepReadonly', () => {
        test('должна создавать глубоко readonly копию объекта', () => {
            const readonlyConfig = deepReadonly(config);
            
            expect(readonlyConfig.apiUrl).toBe(config.apiUrl);
            expect(readonlyConfig.timeout).toBe(config.timeout);
            expect(readonlyConfig.retry).toBe(config.retry);
        });

        test('должна работать с вложенными объектами', () => {
            interface Nested {
                level1: {
                    level2: {
                        value: string;
                    };
                };
            }

            const nested: Nested = {
                level1: {
                    level2: {
                        value: 'test'
                    }
                }
            };

            const readonlyNested = deepReadonly(nested);
            expect(readonlyNested.level1.level2.value).toBe('test');
        });

        test('должна работать с массивами', () => {
            interface WithArray {
                items: string[];
                count: number;
            }

            const withArray: WithArray = {
                items: ['a', 'b', 'c'],
                count: 3
            };

            const readonly = deepReadonly(withArray);
            expect(readonly.items).toEqual(['a', 'b', 'c']);
            expect(readonly.count).toBe(3);
        });

        test('должна сохранять структуру объекта', () => {
            const readonlyConfig = deepReadonly(config);
            expect(Object.keys(readonlyConfig)).toEqual(Object.keys(config));
        });
    });

    describe('FunctionKeys', () => {
        test('должна определять ключи с функциями как значениями', () => {
            // Проверяем на уровне типов
            type TestKeys = FunctionKeys<Config>;
            const testKeys: TestKeys[] = ['retry', 'validate', 'onSuccess'];
            expect(testKeys.length).toBe(3);
        });

        test('должна исключать не-функциональные ключи', () => {
            type TestKeys = FunctionKeys<Config>;
            // @ts-expect-error - apiUrl не является функцией
            const invalid: TestKeys = 'apiUrl';
            expect(invalid).toBe('apiUrl'); // Время выполнения не проверяет это
        });
    });

    describe('getFunctionKeys', () => {
        test('должна возвращать массив ключей, значения которых являются функциями', () => {
            const result = getFunctionKeys(config);
            
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
            expect(result).toContain('retry');
            expect(result).toContain('validate');
        });

        test('должна исключать не-функциональные свойства', () => {
            const result = getFunctionKeys(config);
            
            expect(result).not.toContain('apiUrl');
            expect(result).not.toContain('timeout');
        });

        test('должна работать с опциональными функциями', () => {
            const result = getFunctionKeys(config);
            
            // onSuccess может быть включен, если он определен
            if (config.onSuccess) {
                expect(result).toContain('onSuccess');
            }
        });

        test('должна возвращать пустой массив для объекта без функций', () => {
            const obj = { a: 1, b: 'hello', c: true };
            const result = getFunctionKeys(obj);
            
            expect(result).toEqual([]);
        });

        test('должна работать с объектами, содержащими только функции', () => {
            const obj = {
                fn1: () => 1,
                fn2: () => 2,
                fn3: (x: number) => x * 2
            };
            
            const result = getFunctionKeys(obj);
            expect(result.length).toBe(3);
            expect(result).toContain('fn1');
            expect(result).toContain('fn2');
            expect(result).toContain('fn3');
        });
    });
});
