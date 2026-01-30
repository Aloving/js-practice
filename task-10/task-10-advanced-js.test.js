// @no-ai-suggestions
// @disable-autocomplete
const { createReactiveObject, createValidator, createCache, createImmutable } = require('./task-10-advanced-js');

describe('Task 10: JavaScript - Proxy и Reflect API', () => {
    describe('createReactiveObject', () => {
        test('должен создавать объект, который логирует операции чтения', () => {
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => logs.push(args.join(' '));

            const obj = createReactiveObject({ name: 'John', age: 30 });
            const name = obj.name;

            console.log = originalLog;
            expect(name).toBe('John');
            expect(logs.some(log => log.includes('READ') && log.includes('name'))).toBe(true);
        });

        test('должен логировать операции записи', () => {
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => logs.push(args.join(' '));

            const obj = createReactiveObject({ name: 'John' });
            obj.age = 30;

            console.log = originalLog;
            expect(obj.age).toBe(30);
            expect(logs.some(log => log.includes('WRITE') && log.includes('age'))).toBe(true);
        });

        test('должен логировать операции удаления', () => {
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => logs.push(args.join(' '));

            const obj = createReactiveObject({ name: 'John', age: 30 });
            delete obj.age;

            console.log = originalLog;
            expect(obj.age).toBeUndefined();
            expect(logs.some(log => log.includes('DELETE') && log.includes('age'))).toBe(true);
        });

        test('должен сохранять исходные значения объекта', () => {
            const original = { name: 'John', age: 30, email: 'john@example.com' };
            const reactive = createReactiveObject(original);

            expect(reactive.name).toBe('John');
            expect(reactive.age).toBe(30);
            expect(reactive.email).toBe('john@example.com');
        });

        test('должен позволять изменять значения', () => {
            const obj = createReactiveObject({ name: 'John', age: 30 });
            obj.name = 'Jane';
            obj.age = 25;

            expect(obj.name).toBe('Jane');
            expect(obj.age).toBe(25);
        });
    });

    describe('createValidator', () => {
        test('должен разрешать корректные значения', () => {
            const obj = createValidator({}, { name: 'string', age: 'number' });
            obj.name = 'Alice';
            obj.age = 25;

            expect(obj.name).toBe('Alice');
            expect(obj.age).toBe(25);
        });

        test('должен выбрасывать ошибку при неверном типе', () => {
            const obj = createValidator({}, { name: 'string', age: 'number' });
            
            expect(() => {
                obj.age = '25';
            }).toThrow(/Invalid type for age/);
        });

        test('должен выбрасывать ошибку при несуществующем свойстве в схеме', () => {
            const obj = createValidator({}, { name: 'string' });
            
            expect(() => {
                obj.unknown = 'value';
            }).toThrow(/not allowed in schema/);
        });

        test('должен проверять тип string', () => {
            const obj = createValidator({}, { name: 'string' });
            
            obj.name = 'test';
            expect(obj.name).toBe('test');

            expect(() => {
                obj.name = 123;
            }).toThrow(/Invalid type for name/);
        });

        test('должен проверять тип number', () => {
            const obj = createValidator({}, { age: 'number' });
            
            obj.age = 25;
            expect(obj.age).toBe(25);

            expect(() => {
                obj.age = '25';
            }).toThrow(/Invalid type for age/);
        });

        test('должен работать с опциональными полями', () => {
            const obj = createValidator({}, { name: 'string', age: 'number' });
            obj.name = 'Bob';
            // age не установлен, но это должно быть OK
            expect(obj.name).toBe('Bob');
        });
    });

    describe('createCache', () => {
        test('должен кэшировать результаты вызовов методов', () => {
            let callCount = 0;
            const calculator = createCache({
                add: (a, b) => {
                    callCount++;
                    return a + b;
                }
            }, 1000);

            const result1 = calculator.add(2, 3);
            const result2 = calculator.add(2, 3);

            expect(result1).toBe(5);
            expect(result2).toBe(5);
            expect(callCount).toBe(1); // метод должен быть вызван только один раз
        });

        test('должен инвалидировать кэш после истечения TTL', (done) => {
            let callCount = 0;
            const calculator = createCache({
                multiply: (a, b) => {
                    callCount++;
                    return a * b;
                }
            }, 100); // короткий TTL

            calculator.multiply(5, 6);
            expect(callCount).toBe(1);

            calculator.multiply(5, 6);
            expect(callCount).toBe(1); // из кэша

            setTimeout(() => {
                calculator.multiply(5, 6);
                expect(callCount).toBe(2); // кэш истек
                done();
            }, 150);
        });

        test('должен кэшировать разные аргументы отдельно', () => {
            let callCount = 0;
            const calculator = createCache({
                subtract: (a, b) => {
                    callCount++;
                    return a - b;
                }
            }, 1000);

            calculator.subtract(10, 5);
            calculator.subtract(10, 5);
            calculator.subtract(20, 10);

            expect(callCount).toBe(2); // разные аргументы = разные вызовы
        });

        test('должен работать с методами без аргументов', () => {
            let callCount = 0;
            const obj = createCache({
                getValue: () => {
                    callCount++;
                    return 42;
                }
            }, 1000);

            const result1 = obj.getValue();
            const result2 = obj.getValue();

            expect(result1).toBe(42);
            expect(result2).toBe(42);
            expect(callCount).toBe(1);
        });

        test('должен работать с методами с множественными аргументами', () => {
            let callCount = 0;
            const calculator = createCache({
                sum: (...args) => {
                    callCount++;
                    return args.reduce((a, b) => a + b, 0);
                }
            }, 1000);

            calculator.sum(1, 2, 3);
            calculator.sum(1, 2, 3);
            calculator.sum(4, 5, 6);

            expect(callCount).toBe(2);
        });
    });

    describe('createImmutable', () => {
        test('должен разрешать чтение свойств', () => {
            const obj = createImmutable({ value: 42, name: 'test' });
            
            expect(obj.value).toBe(42);
            expect(obj.name).toBe('test');
        });

        test('должен выбрасывать ошибку при попытке изменить свойство', () => {
            const obj = createImmutable({ value: 42 });
            
            expect(() => {
                obj.value = 100;
            }).toThrow(/Cannot modify immutable object/);
        });

        test('должен выбрасывать ошибку при попытке добавить новое свойство', () => {
            const obj = createImmutable({ value: 42 });
            
            expect(() => {
                obj.newProp = 'test';
            }).toThrow(/Cannot modify immutable object/);
        });

        test('должен выбрасывать ошибку при попытке удалить свойство', () => {
            const obj = createImmutable({ value: 42, name: 'test' });
            
            expect(() => {
                delete obj.value;
            }).toThrow(/Cannot modify immutable object/);
        });

        test('должен сохранять исходные значения', () => {
            const original = { value: 42, nested: { a: 1 } };
            const immutable = createImmutable(original);
            
            expect(immutable.value).toBe(42);
            expect(immutable.nested.a).toBe(1);
        });

        test('должен работать с различными типами значений', () => {
            const obj = createImmutable({
                string: 'text',
                number: 42,
                boolean: true,
                array: [1, 2, 3],
                object: { nested: true }
            });

            expect(obj.string).toBe('text');
            expect(obj.number).toBe(42);
            expect(obj.boolean).toBe(true);
            expect(obj.array).toEqual([1, 2, 3]);
            expect(obj.object.nested).toBe(true);
        });
    });

    describe('Интеграционные тесты', () => {
        test('должен работать с комбинацией реактивного и валидирующего прокси', () => {
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => logs.push(args.join(' '));

            const base = {};
            const validated = createValidator(base, { name: 'string', age: 'number' });
            const reactive = createReactiveObject(validated);

            reactive.name = 'Test';
            reactive.age = 30;
            const name = reactive.name;

            console.log = originalLog;
            expect(name).toBe('Test');
            expect(reactive.age).toBe(30);
            expect(logs.some(log => log.includes('READ'))).toBe(true);
        });

        test('должен работать с кэшированием и неизменяемыми объектами', () => {
            const immutable = createImmutable({ getValue: () => 42 });
            const cached = createCache(immutable, 1000);

            const result1 = cached.getValue();
            const result2 = cached.getValue();

            expect(result1).toBe(42);
            expect(result2).toBe(42);
        });
    });
});
