// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 4: Работа с объектами и прототипами (Средний-продвинутый уровень)
 * 
 * Реализуйте класс EventEmitter, который позволяет подписываться на события
 * и эмитить их. Это упрощенная версия паттерна Observer.
 * 
 * Требования:
 * 1. Метод on(eventName, callback) - подписывает callback на событие eventName
 * 2. Метод off(eventName, callback) - отписывает callback от события eventName
 * 3. Метод emit(eventName, ...args) - вызывает все callbacks, подписанные на eventName, с аргументами args
 * 4. Метод once(eventName, callback) - подписывает callback на событие, но вызывает его только один раз
 * 5. Метод removeAllListeners(eventName) - удаляет все подписки на событие eventName
 * 
 * Дополнительно:
 * - Реализуйте метод listeners(eventName) - возвращает массив всех callbacks для события
 * - Реализуйте метод listenerCount(eventName) - возвращает количество подписок на событие
 */

class EventEmitter {
    events = {};
    onceEvents = {};

    on(eventName, callback) {
        const listeners = this.events[eventName];

        if (listeners) {
            this.events[eventName] = [...listeners, callback];
        } else {
            this.events[eventName] = [callback];
        }

    }

    off(eventName, callback) {
        const listeners = this.events[eventName];
        const onceListeners = this.onceEvents[eventName];

        if (listeners) {
            const newListeners = listeners.filter((listener) => listener !== callback);

            this.events[eventName] = newListeners;
        }

        if (onceListeners) {
            const newListeners = onceListeners.filter((listener) => listener !== callback);

            this.onceEvents[eventName] = newListeners;
        }
    }

    emit(eventName, ...args) {
        const listeners = this.events[eventName];
        const onceListeners = this.onceEvents[eventName];

        listeners?.forEach((listener) => {
            console.log('listener', eventName);
            listener(...args);
        });

        if (onceListeners) {
            onceListeners?.forEach((listener) => {
                listener(...args);
                this.off(eventName, listener);                
            });
        }

        
    }

    once(eventName, callback) {
        const listeners = this.onceEvents[eventName];

        if (listeners) {
            this.onceEvents[eventName] = [...listeners, callback];
        } else {
            this.onceEvents[eventName] = [callback];
        }
    }

    removeAllListeners(eventName) {
        delete this.onceEvents[eventName];
        delete this.events[eventName];
    }

    listeners(eventName) {
        const listeners = this.events[eventName] || [];
        const onceListeners = this.onceEvents[eventName] || [];

        return [...listeners, ...onceListeners];
        // return this
    }

    listenerCount(eventName) {
        return this.listeners(eventName).length;
    }
    // ВАШЕ РЕШЕНИЕ ЗДЕСЬ
}

module.exports = { EventEmitter };
