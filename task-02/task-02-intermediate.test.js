const { createCounter } = require('./task-02-intermediate.js');

describe('Task 2: Замыкания и каррирование', () => {
    describe('Базовые методы счетчика', () => {
        test('должен создавать счетчик с начальным значением', () => {
            const counter = createCounter(10);
            expect(counter.getValue()).toBe(10);
        });

        test('должен создавать счетчик с начальным значением 0 по умолчанию', () => {
            const counter = createCounter();
            expect(counter.getValue()).toBe(0);
        });

        test('должен увеличивать значение на 1', () => {
            const counter = createCounter(5);
            counter.increment();
            expect(counter.getValue()).toBe(6);
        });

        test('должен уменьшать значение на 1', () => {
            const counter = createCounter(10);
            counter.decrement();
            expect(counter.getValue()).toBe(9);
        });

        test('должен сбрасывать значение к начальному', () => {
            const counter = createCounter(10);
            counter.increment();
            counter.increment();
            counter.reset();
            expect(counter.getValue()).toBe(10);
        });
    });

    describe('Метод setStep', () => {
        test('должен устанавливать шаг изменения', () => {
            const counter = createCounter(10);
            counter.setStep(5);
            counter.increment();
            expect(counter.getValue()).toBe(15);
        });

        test('должен использовать установленный шаг для decrement', () => {
            const counter = createCounter(20);
            counter.setStep(3);
            counter.decrement();
            expect(counter.getValue()).toBe(17);
        });

        test('должен использовать шаг по умолчанию 1, если не установлен', () => {
            const counter = createCounter(0);
            counter.increment();
            expect(counter.getValue()).toBe(1);
        });

        test('должен работать с несколькими вызовами setStep', () => {
            const counter = createCounter(0);
            counter.setStep(2);
            counter.increment(); // 2
            counter.setStep(5);
            counter.increment(); // 7
            expect(counter.getValue()).toBe(7);
        });
    });

    describe('Независимость счетчиков', () => {
        test('должен создавать независимые счетчики', () => {
            const counter1 = createCounter(10);
            const counter2 = createCounter(20);
            
            counter1.increment();
            counter2.decrement();
            
            expect(counter1.getValue()).toBe(11);
            expect(counter2.getValue()).toBe(19);
        });

        test('должен поддерживать разные шаги для разных счетчиков', () => {
            const counter1 = createCounter(0);
            const counter2 = createCounter(0);
            
            counter1.setStep(2);
            counter2.setStep(3);
            
            counter1.increment();
            counter2.increment();
            
            expect(counter1.getValue()).toBe(2);
            expect(counter2.getValue()).toBe(3);
        });
    });

    describe('Комплексные сценарии', () => {
        test('должен корректно работать с последовательностью операций', () => {
            const counter = createCounter(10);
            counter.increment(); // 11
            counter.increment(); // 12
            counter.decrement(); // 11
            expect(counter.getValue()).toBe(11);
            
            counter.setStep(5);
            counter.increment(); // 16
            expect(counter.getValue()).toBe(16);
            
            counter.reset(); // 10
            expect(counter.getValue()).toBe(10);
        });
    });
});

