import {
    NetworkError,
    ValidationError,
    NotFoundError,
    ErrorType,
    isNetworkError,
    isValidationError,
    isNotFoundError,
    Success,
    Failure,
    Result,
    handleResult,
    mapResult,
    flatMapResult
} from './task-09-typescript';

describe('Task 9: TypeScript - Discriminated Unions и Type Guards', () => {
    const networkError: NetworkError = {
        type: 'network',
        message: 'Connection failed',
        code: 500
    };

    const validationError: ValidationError = {
        type: 'validation',
        message: 'Invalid input',
        field: 'email'
    };

    const notFoundError: NotFoundError = {
        type: 'notFound',
        message: 'Resource not found',
        resource: 'user'
    };

    describe('Type Guards', () => {
        describe('isNetworkError', () => {
            test('должна возвращать true для NetworkError', () => {
                expect(isNetworkError(networkError)).toBe(true);
            });

            test('должна возвращать false для других типов ошибок', () => {
                expect(isNetworkError(validationError)).toBe(false);
                expect(isNetworkError(notFoundError)).toBe(false);
            });

            test('должна сужать тип до NetworkError', () => {
                const error: ErrorType = networkError;
                if (isNetworkError(error)) {
                    expect(typeof error.code).toBe('number');
                    expect(error.code).toBe(500);
                }
            });
        });

        describe('isValidationError', () => {
            test('должна возвращать true для ValidationError', () => {
                expect(isValidationError(validationError)).toBe(true);
            });

            test('должна возвращать false для других типов ошибок', () => {
                expect(isValidationError(networkError)).toBe(false);
                expect(isValidationError(notFoundError)).toBe(false);
            });

            test('должна сужать тип до ValidationError', () => {
                const error: ErrorType = validationError;
                if (isValidationError(error)) {
                    expect(typeof error.field).toBe('string');
                    expect(error.field).toBe('email');
                }
            });
        });

        describe('isNotFoundError', () => {
            test('должна возвращать true для NotFoundError', () => {
                expect(isNotFoundError(notFoundError)).toBe(true);
            });

            test('должна возвращать false для других типов ошибок', () => {
                expect(isNotFoundError(networkError)).toBe(false);
                expect(isNotFoundError(validationError)).toBe(false);
            });

            test('должна сужать тип до NotFoundError', () => {
                const error: ErrorType = notFoundError;
                if (isNotFoundError(error)) {
                    expect(typeof error.resource).toBe('string');
                    expect(error.resource).toBe('user');
                }
            });
        });
    });

    describe('Result', () => {
        describe('Success', () => {
            test('должен иметь тип success и значение', () => {
                const result: Result<string> = { type: 'success', value: 'test' };
                
                expect(result.type).toBe('success');
                expect(result.value).toBe('test');
            });

            test('должен работать с разными типами значений', () => {
                const stringResult: Result<string> = { type: 'success', value: 'hello' };
                const numberResult: Result<number> = { type: 'success', value: 42 };
                const objectResult: Result<{ a: number }> = { type: 'success', value: { a: 1 } };
                
                expect(stringResult.value).toBe('hello');
                expect(numberResult.value).toBe(42);
                expect(objectResult.value).toEqual({ a: 1 });
            });
        });

        describe('Failure', () => {
            test('должен иметь тип failure и ошибку', () => {
                const result: Result<string> = { type: 'failure', error: networkError };
                
                expect(result.type).toBe('failure');
                expect(result.error).toBe(networkError);
            });

            test('должен работать с разными типами ошибок', () => {
                const networkFailure: Result<string> = { type: 'failure', error: networkError };
                const validationFailure: Result<string> = { type: 'failure', error: validationError };
                const notFoundFailure: Result<string> = { type: 'failure', error: notFoundError };
                
                expect(networkFailure.error.type).toBe('network');
                expect(validationFailure.error.type).toBe('validation');
                expect(notFoundFailure.error.type).toBe('notFound');
            });
        });
    });

    describe('handleResult', () => {
        test('должна вызывать onSuccess для успешного результата', () => {
            const success: Result<string> = { type: 'success', value: 'Hello' };
            let calledValue: string | undefined;
            
            handleResult(
                success,
                (value) => { calledValue = value; },
                () => { fail('onError не должна вызываться'); }
            );
            
            expect(calledValue).toBe('Hello');
        });

        test('должна вызывать onError для неуспешного результата', () => {
            const failure: Result<string> = { type: 'failure', error: networkError };
            let calledError: ErrorType | undefined;
            
            handleResult(
                failure,
                () => { fail('onSuccess не должна вызываться'); },
                (error) => { calledError = error; }
            );
            
            expect(calledError).toBe(networkError);
        });

        test('должна корректно работать с разными типами значений', () => {
            const numberResult: Result<number> = { type: 'success', value: 42 };
            let value: number | undefined;
            
            handleResult(
                numberResult,
                (v) => { value = v; },
                () => {}
            );
            
            expect(value).toBe(42);
        });
    });

    describe('mapResult', () => {
        test('должна применять mapper к успешному результату', () => {
            const success: Result<string> = { type: 'success', value: 'hello' };
            const mapped = mapResult(success, (s) => s.length);
            
            expect(mapped.type).toBe('success');
            if (mapped.type === 'success') {
                expect(mapped.value).toBe(5);
            }
        });

        test('должна возвращать тот же Failure для неуспешного результата', () => {
            const failure: Result<string> = { type: 'failure', error: networkError };
            const mapped = mapResult(failure, (s) => s.length);
            
            expect(mapped.type).toBe('failure');
            if (mapped.type === 'failure') {
                expect(mapped.error).toBe(networkError);
            }
        });

        test('должна сохранять тип ошибки', () => {
            const failure: Result<string> = { type: 'failure', error: validationError };
            const mapped = mapResult(failure, (s) => s.toUpperCase());
            
            expect(mapped.type).toBe('failure');
            if (mapped.type === 'failure') {
                expect(isValidationError(mapped.error)).toBe(true);
            }
        });

        test('должна работать с разными типами преобразований', () => {
            const success: Result<number> = { type: 'success', value: 5 };
            const mapped = mapResult(success, (n) => n * 2);
            
            expect(mapped.type).toBe('success');
            if (mapped.type === 'success') {
                expect(mapped.value).toBe(10);
            }
        });
    });

    describe('flatMapResult', () => {
        test('должна применять mapper, возвращающий Success, к успешному результату', () => {
            const success: Result<string> = { type: 'success', value: 'hello' };
            const flatMapped = flatMapResult(
                success,
                (s) => ({ type: 'success' as const, value: s.toUpperCase() })
            );
            
            expect(flatMapped.type).toBe('success');
            if (flatMapped.type === 'success') {
                expect(flatMapped.value).toBe('HELLO');
            }
        });

        test('должна применять mapper, возвращающий Failure, к успешному результату', () => {
            const success: Result<string> = { type: 'success', value: 'hello' };
            const flatMapped = flatMapResult(
                success,
                () => ({ type: 'failure' as const, error: validationError })
            );
            
            expect(flatMapped.type).toBe('failure');
            if (flatMapped.type === 'failure') {
                expect(flatMapped.error).toBe(validationError);
            }
        });

        test('должна возвращать тот же Failure для неуспешного результата', () => {
            const failure: Result<string> = { type: 'failure', error: networkError };
            const flatMapped = flatMapResult(
                failure,
                (s) => ({ type: 'success' as const, value: s.toUpperCase() })
            );
            
            expect(flatMapped.type).toBe('failure');
            if (flatMapped.type === 'failure') {
                expect(flatMapped.error).toBe(networkError);
            }
        });

        test('должна работать с цепочкой операций', () => {
            const success: Result<number> = { type: 'success', value: 5 };
            
            const step1 = flatMapResult(
                success,
                (n) => ({ type: 'success' as const, value: n * 2 })
            );
            
            const step2 = flatMapResult(
                step1,
                (n) => ({ type: 'success' as const, value: n.toString() })
            );
            
            expect(step2.type).toBe('success');
            if (step2.type === 'success') {
                expect(step2.value).toBe('10');
            }
        });

        test('должна обрабатывать ошибки в цепочке', () => {
            const success: Result<number> = { type: 'success', value: 5 };
            
            const step1 = flatMapResult(
                success,
                (n) => ({ type: 'success' as const, value: n * 2 })
            );
            
            const step2 = flatMapResult(
                step1,
                () => ({ type: 'failure' as const, error: validationError })
            );
            
            const step3 = flatMapResult(
                step2,
                (n) => ({ type: 'success' as const, value: n.toString() })
            );
            
            expect(step3.type).toBe('failure');
            if (step3.type === 'failure') {
                expect(step3.error).toBe(validationError);
            }
        });
    });

    describe('Интеграционные тесты', () => {
        test('должна работать с полным циклом обработки результата', () => {
            const fetchUser = (id: number): Result<{ id: number; name: string }> => {
                if (id === 1) {
                    return { type: 'success', value: { id: 1, name: 'Alice' } };
                }
                return { type: 'failure', error: notFoundError };
            };

            const result1 = fetchUser(1);
            const userName = mapResult(result1, (user) => user.name);
            
            expect(userName.type).toBe('success');
            if (userName.type === 'success') {
                expect(userName.value).toBe('Alice');
            }

            const result2 = fetchUser(999);
            expect(result2.type).toBe('failure');
            if (result2.type === 'failure') {
                expect(isNotFoundError(result2.error)).toBe(true);
            }
        });
    });
});
