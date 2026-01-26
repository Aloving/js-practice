// @no-ai-suggestions
// @disable-autocomplete

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
