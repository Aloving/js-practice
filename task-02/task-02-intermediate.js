// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 2: Замыкания и каррирование (Средний уровень)
 * 
 * Реализуйте функцию-генератор счетчиков с использованием замыканий.
 * Каждый счетчик должен иметь методы:
 * - increment() - увеличивает значение на 1
 * - decrement() - уменьшает значение на 1
 * - getValue() - возвращает текущее значение
 * - reset() - сбрасывает значение к начальному
 * 
 * Функция createCounter должна принимать начальное значение (по умолчанию 0)
 * и возвращать объект с методами.
 * 
 * Дополнительно: реализуйте метод setStep(step), который устанавливает шаг
 * изменения (по умолчанию 1). increment и decrement должны использовать этот шаг.
 * 
 * Примеры:
 * const counter1 = createCounter(10);
 * counter1.increment(); // 11
 * counter1.increment(); // 12
 * counter1.decrement(); // 11
 * counter1.getValue(); // 11
 * counter1.setStep(5);
 * counter1.increment(); // 16
 * counter1.reset(); // 10
 * 
 * const counter2 = createCounter();
 * counter2.increment(); // 1
 * counter2.getValue(); // 1
 */

function createCounter(initialValue = 0) {
    let step = 1;
    let value = initialValue;

    const increment = () => {
        value += step;
    };
    const decrement = () => {
        value -= step;
    };
    const getValue = () => {
        return value;
    };
    const reset = () => {
        value = initialValue;
    };
    const setStep = (newStep = 1) => {
        step = newStep;
    };

    return {
        increment,
        decrement,
        getValue,
        reset,
        setStep
    };
}

// Тесты для проверки
const counter1 = createCounter(10);
counter1.increment();
counter1.increment();
counter1.decrement();
console.log('Тест 1:', counter1.getValue() === 11);
counter1.setStep(5);
counter1.increment();
console.log('Тест 2:', counter1.getValue() === 16);
counter1.reset();
console.log('Тест 3:', counter1.getValue() === 10);

const counter2 = createCounter();
counter2.increment();
console.log('Тест 4:', counter2.getValue() === 1);
counter2.setStep(3);
counter2.increment();
console.log('Тест 5:', counter2.getValue() === 4);



module.exports = { createCounter };