// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 18: RxJS практика (Средний и сложный уровень)
 *
 * Реализуйте функции с использованием RxJS Observable и операторов.
 *
 * 1. createDebouncedInputStream(input$, ms)
 *    Принимает поток строк input$ (например, значения input) и возвращает новый поток,
 *    который:
 *    - эмитит значение только если прошло ms миллисекунд с момента последнего ввода
 *    - не эмитит одинаковые значения подряд
 *    Подсказка: debounceTime, distinctUntilChanged
 *
 * 2. createThrottledEventStream(event$, ms)
 *    Принимает поток событий event$ и возвращает новый поток, который пропускает
 *    не чаще 1 события в ms миллисекунд.
 *    Подсказка: throttleTime
 *
 * 3. createSearchStream(query$, searchFn, config)
 *    Реализуйте поток для поиска:
 *    - query$ — поток строк (поисковый запрос)
 *    - searchFn(query) => Observable|Promise|value — функция поиска
 *    - config: { debounceMs: number, minLength: number }
 *
 *    Требования:
 *    - debounce запросов на debounceMs
 *    - игнорировать запросы короче minLength
 *    - не выполнять поиск, если запрос не изменился
 *    - при новом запросе отменять предыдущий поиск
 *    Подсказка: debounceTime, filter, distinctUntilChanged, switchMap, from
 *
 * 4. retryWithBackoff(sourceFactory, options)
 *    Сложный уровень.
 *    - sourceFactory: () => Observable
 *    - options: { maxRetries: number, baseDelayMs: number }
 *
 *    Должен повторять подписку при ошибке с экспоненциальной задержкой:
 *    delay = baseDelayMs * 2^(attempt-1)
 *    После исчерпания maxRetries — пробросить последнюю ошибку.
 *    Подсказка: defer, retryWhen, scan, mergeMap, timer, throwError
 */

const { defer, from, timer, throwError } = require("rxjs");
const {
  debounceTime,
  distinctUntilChanged,
  filter,
  mergeMap,
  retryWhen,
  scan,
  switchMap,
  throttleTime,
} = require("rxjs/operators");

function createDebouncedInputStream(input$, ms = 300) {
  return input$.pipe(debounceTime(ms), distinctUntilChanged());
}

function createThrottledEventStream(event$, ms = 300) {
  return event$.pipe(throttleTime(ms));
}

function createSearchStream(
  query$,
  searchFn,
  config = { debounceMs: 300, minLength: 1 }
) {
  const { debounceMs = 300, minLength = 1 } = config || {};

  return query$.pipe(
    debounceTime(debounceMs),
    distinctUntilChanged(),
    filter((q) => typeof q === "string" && q.length >= minLength),
    switchMap((q) => from(searchFn(q)))
  );
}

function retryWithBackoff(
  sourceFactory,
  options = { maxRetries: 3, baseDelayMs: 100 }
) {
  const { maxRetries = 3, baseDelayMs = 100 } = options || {};

  return defer(() => sourceFactory()).pipe(
    retryWhen((errors$) =>
      errors$.pipe(
        scan(
          (state, error) => ({ attempt: state.attempt + 1, error }),
          { attempt: 0, error: null }
        ),
        mergeMap(({ attempt, error }) => {
          if (attempt > maxRetries) {
            return throwError(() => error);
          }

          const delayMs = baseDelayMs * 2 ** (attempt - 1);
          return timer(delayMs);
        })
      )
    )
  );
}

module.exports = {
  createDebouncedInputStream,
  createThrottledEventStream,
  createSearchStream,
  retryWithBackoff,
};
