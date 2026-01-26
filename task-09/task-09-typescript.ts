// @no-ai-suggestions
// @disable-autocomplete
/*
 * ЗАДАЧА 9: TypeScript - Discriminated Unions и Type Guards (Продвинутый уровень)
 * 
 * Реализуйте функции с использованием Discriminated Unions и Type Guards:
 * 
 * 1. Создайте discriminated union для представления различных типов ошибок:
 *    type ErrorType = NetworkError | ValidationError | NotFoundError
 *    Каждый тип должен иметь поле 'type' (discriminator) и специфичные поля
 * 
 * 2. Реализуйте type guards для каждого типа ошибки:
 *    - isNetworkError(error: ErrorType): error is NetworkError
 *    - isValidationError(error: ErrorType): error is ValidationError
 *    - isNotFoundError(error: ErrorType): error is NotFoundError
 * 
 * 3. Создайте discriminated union для результата операции:
 *    type Result<T, E = ErrorType> = Success<T> | Failure<E>
 * 
 * 4. Реализуйте generic функцию handleResult<T, E>(
 *      result: Result<T, E>,
 *      onSuccess: (value: T) => void,
 *      onError: (error: E) => void
 *    ): void
 * 
 * 5. Создайте generic функцию mapResult<T, U, E>(
 *      result: Result<T, E>,
 *      mapper: (value: T) => U
 *    ): Result<U, E>
 * 
 * 6. Реализуйте generic функцию flatMapResult<T, U, E>(
 *      result: Result<T, E>,
 *      mapper: (value: T) => Result<U, E>
 *    ): Result<U, E>
 * 
 * Примеры:
 * const networkError: NetworkError = {
 *     type: 'network',
 *     message: 'Connection failed',
 *     code: 500
 * };
 * 
 * const success: Result<string> = { type: 'success', value: 'Hello' };
 * const failure: Result<string> = { type: 'failure', error: networkError };
 * 
 * handleResult(success, (v) => console.log(v), (e) => console.error(e));
 * const mapped = mapResult(success, (s) => s.length);
 * const flatMapped = flatMapResult(success, (s) => ({ type: 'success' as const, value: s.toUpperCase() }));
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ
// Определите здесь:
// - интерфейс NetworkError { type: 'network', message: string, code: number }
// - интерфейс ValidationError { type: 'validation', message: string, field: string }
// - интерфейс NotFoundError { type: 'notFound', message: string, resource: string }
// - тип ErrorType = NetworkError | ValidationError | NotFoundError
// - type guards: isNetworkError, isValidationError, isNotFoundError
// - тип Success<T> { type: 'success', value: T }
// - тип Failure<E> { type: 'failure', error: E }
// - тип Result<T, E = ErrorType> = Success<T> | Failure<E>
// - функции: handleResult, mapResult, flatMapResult

// Тесты для проверки
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

const success: Result<string> = { type: 'success', value: 'Hello' };
const failure: Result<string> = { type: 'failure', error: networkError };

console.log('Тест 1:', isNetworkError(networkError) === true);
console.log('Тест 2:', isValidationError(validationError) === true);
console.log('Тест 3:', isNotFoundError(notFoundError) === true);
console.log('Тест 4:', isNetworkError(validationError) === false);

let testValue: string | undefined;
handleResult(success, (v) => { testValue = v; }, () => {});
console.log('Тест 5:', testValue === 'Hello');

const mapped = mapResult(success, (s) => s.length);
console.log('Тест 6:', mapped.type === 'success' && mapped.value === 5);

export {
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
};
