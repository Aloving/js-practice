# JavaScript Practice Tasks

Коллекция задач по JavaScript для практики, от базового к продвинутому уровню.

## Структура

Каждая задача находится в отдельной папке:

- `task-interview/` - Задачи с собеседований (JS/TS, базовый-средний)
  - `task-interview-01-two-sum.js` - Two Sum (собеседование)
  - `task-interview-01-two-sum.test.js` - тесты (собеседование)
  - `task-interview-02-chunk-array.js` - Chunk Array (собеседование)
  - `task-interview-02-chunk-array.test.js` - тесты (собеседование)
  - `task-interview-03-two-sum.ts` - Two Sum (TypeScript, собеседование)
  - `task-interview-03-two-sum.test.ts` - тесты (собеседование)
  - `task-interview-04-chunk-array.ts` - Chunk Array (TypeScript, собеседование)
  - `task-interview-04-chunk-array.test.ts` - тесты (собеседование)
- `task-01/` - Базовые задачи (массивы, функции)
  - `task-01-basic.js` - файл с задачей
  - `task-01-basic.test.js` - тесты для задачи
- `task-02/` - Средний уровень (замыкания, каррирование)
  - `task-02-intermediate.js` - файл с задачей
  - `task-02-intermediate.test.js` - тесты для задачи
- `task-03/` - Продвинутый уровень (async/await, промисы)
  - `task-03-async.js` - файл с задачей
  - `task-03-async.test.js` - тесты для задачи
- `task-04/` - Работа с объектами и прототипами (EventEmitter)
  - `task-04-objects.js` - файл с задачей
  - `task-04-objects.test.js` - тесты для задачи
- `task-05/` - Продвинутый async (debounce, throttle, retry, promiseQueue)
  - `task-05-advanced-async.js` - файл с задачей
  - `task-05-advanced-async.test.js` - тесты для задачи
- `task-06/` - TypeScript (типы и интерфейсы)
  - `task-06-typescript.ts` - файл с задачей
  - `task-06-typescript.test.ts` - тесты для задачи
- `task-07/` - TypeScript (Generics и Utility Types)
  - `task-07-typescript.ts` - файл с задачей
  - `task-07-typescript.test.ts` - тесты для задачи
- `task-08/` - TypeScript (Условные типы и Mapped Types)
  - `task-08-typescript.ts` - файл с задачей
  - `task-08-typescript.test.ts` - тесты для задачи
- `task-09/` - TypeScript (Discriminated Unions и Type Guards)
  - `task-09-typescript.ts` - файл с задачей
  - `task-09-typescript.test.ts` - тесты для задачи
- `task-10/` - JavaScript (Proxy и Reflect API)
  - `task-10-advanced-js.js` - файл с задачей
  - `task-10-advanced-js.test.js` - тесты для задачи
- `task-11/` - JavaScript (WeakMap, WeakSet, Symbol)
  - `task-11-advanced-js.js` - файл с задачей
  - `task-11-advanced-js.test.js` - тесты для задачи
- `task-12/` - JavaScript (Генераторы и итераторы)
  - `task-12-advanced-js.js` - файл с задачей
  - `task-12-advanced-js.test.js` - тесты для задачи
- `task-13/` - TypeScript (Template Literal Types и String Manipulation)
  - `task-13-typescript.ts` - файл с задачей
  - `task-13-typescript.test.ts` - тесты для задачи
- `task-14/` - TypeScript (Recursive Types и Type-level Programming)
  - `task-14-typescript.ts` - файл с задачей
  - `task-14-typescript.test.ts` - тесты для задачи
- `task-15/` - TypeScript (Branded Types и Nominal Typing)
  - `task-15-typescript.ts` - файл с задачей
  - `task-15-typescript.test.ts` - тесты для задачи
- `task-16/` - React (Custom Hooks и State Management)
  - `task-16-react.tsx` - файл с задачей
  - `task-16-react.test.tsx` - тесты для задачи
- `task-17/` - React (Context API и Performance Optimization)
  - `task-17-react.tsx` - файл с задачей
  - `task-17-react.test.tsx` - тесты для задачи
- `task-18/` - RxJS (Observables и Operators)
  - `task-18-rxjs.js` - файл с задачей
  - `task-18-rxjs.test.cjs` - тесты для задачи

## Установка

```bash
npm install
```

## Как использовать

1. Откройте файл с задачей
2. Прочитайте описание и требования
3. Реализуйте решение в указанном месте
4. Запустите тесты для проверки: `npm test`
5. Проверьте линтер: `npm run lint`

## Команды

```bash
# Запустить все тесты
npm test

# Запустить тесты в режиме наблюдения
npm run test:watch

# Запустить тесты с покрытием кода
npm run test:coverage

# Проверить код линтером
npm run lint

# Автоматически исправить ошибки линтера
npm run lint:fix

# Запустить задачу напрямую
node task-01/task-01-basic.js
node task-02/task-02-intermediate.js
node task-03/task-03-async.js
node task-04/task-04-objects.js
node task-05/task-05-advanced-async.js

# Для TypeScript задач нужно скомпилировать или использовать ts-node
npx ts-node task-06/task-06-typescript.ts
npx ts-node task-07/task-07-typescript.ts
npx ts-node task-08/task-08-typescript.ts
npx ts-node task-09/task-09-typescript.ts
npx ts-node task-13/task-13-typescript.ts
npx ts-node task-14/task-14-typescript.ts
npx ts-node task-15/task-15-typescript.ts
```

## Темы для изучения

- ✅ Базовый JavaScript (массивы, функции, объекты)
- ✅ Замыкания и каррирование
- ✅ Асинхронный JavaScript (Promise, async/await)
- ✅ Работа с объектами и прототипами (EventEmitter)
- ✅ Продвинутый async (debounce, throttle, retry, promiseQueue)
- ✅ JavaScript (Proxy и Reflect API)
- ✅ JavaScript (WeakMap, WeakSet, Symbol)
- ✅ JavaScript (Генераторы и итераторы)
- ⬜ RxJS (Observables, Subjects, Operators)
- ⬜ RxJS (Schedulers, multicasting, error handling)
- ✅ TypeScript (типы и интерфейсы)
- ✅ TypeScript (Generics и Utility Types)
- ✅ TypeScript (Условные типы и Mapped Types)
- ✅ TypeScript (Discriminated Unions и Type Guards)
- ✅ TypeScript (Template Literal Types и String Manipulation)
- ✅ TypeScript (Recursive Types и Type-level Programming)
- ✅ TypeScript (Branded Types и Nominal Typing)
- ✅ React (Custom Hooks и State Management)
- ✅ React (Context API и Performance Optimization)

## Инструменты

- **Jest** - фреймворк для тестирования
- **ESLint** - линтер для проверки качества кода
- **React Testing Library** - библиотека для тестирования React компонентов
- **TypeScript** - типизированный JavaScript
