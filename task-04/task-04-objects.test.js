// @no-ai-suggestions
// @disable-autocomplete
const { EventEmitter } = require('./task-04-objects.js');

describe('Task 4: Работа с объектами и прототипами', () => {
    let emitter;

    beforeEach(() => {
        emitter = new EventEmitter();
    });

    describe('Метод on и emit', () => {
        test('должен подписывать и вызывать callback', () => {
            const callback = jest.fn();
            emitter.on('test', callback);
            emitter.emit('test', 'data');

            expect(callback).toHaveBeenCalledWith('data');
            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('должен поддерживать несколько подписок на одно событие', () => {
            const callback1 = jest.fn();
            const callback2 = jest.fn();
            const callback3 = jest.fn();

            emitter.on('test', callback1);
            emitter.on('test', callback2);
            emitter.on('test', callback3);
            emitter.emit('test', 'data');

            expect(callback1).toHaveBeenCalledWith('data');
            expect(callback2).toHaveBeenCalledWith('data');
            expect(callback3).toHaveBeenCalledWith('data');
        });
    });

    describe('Метод off', () => {
        test('должен отписывать callback от события', () => {
            const callback1 = jest.fn();
            const callback2 = jest.fn();

            emitter.on('test', callback1);
            emitter.on('test', callback2);
            emitter.off('test', callback1);
            emitter.emit('test', 'data');

            expect(callback1).not.toHaveBeenCalled();
            expect(callback2).toHaveBeenCalledWith('data');
        });
    });

    describe('Метод once', () => {
        test('должен вызывать callback только один раз', () => {
            const callback = jest.fn();
            emitter.once('test', callback);
            emitter.emit('test', 'data1');
            emitter.emit('test', 'data2');
            emitter.emit('test', 'data3');

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith('data1');
        });
    });

    describe('Метод removeAllListeners', () => {
        test('должен удалять все подписки на событие', () => {
            const callback1 = jest.fn();
            const callback2 = jest.fn();

            emitter.on('test', callback1);
            emitter.on('test', callback2);
            emitter.removeAllListeners('test');
            emitter.emit('test', 'data');

            expect(callback1).not.toHaveBeenCalled();
            expect(callback2).not.toHaveBeenCalled();
        });
    });

    describe('Дополнительные методы', () => {
        test('listeners должен возвращать массив callbacks', () => {
            const callback1 = () => {};
            const callback2 = () => {};

            emitter.on('test', callback1);
            emitter.on('test', callback2);

            const listeners = emitter.listeners('test');
            expect(listeners).toHaveLength(2);
            expect(listeners).toContain(callback1);
            expect(listeners).toContain(callback2);
        });

        test('listenerCount должен возвращать количество подписок', () => {
            expect(emitter.listenerCount('test')).toBe(0);
            emitter.on('test', () => {});
            expect(emitter.listenerCount('test')).toBe(1);
        });
    });
});
