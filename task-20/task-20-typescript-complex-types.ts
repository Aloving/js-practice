// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 20: TypeScript — Сложные структуры и Mapped Types (Продвинутый уровень)
 *
 * 1. Опишите сложную вложенную структуру (API-ответ / DTO) и типы для неё.
 *
 * 2. Реализуйте Mapped Types и утилиты:
 *
 *    - PartialByKeys<T, K extends keyof T> — сделать опциональными только ключи K.
 *    - RequiredByKeys<T, K extends keyof T> — сделать обязательными только ключи K.
 *    - DeepPartial<T> — рекурсивно сделать все поля опциональными (вложенные объекты тоже).
 *    - NullableValues<T> — тип, где все значения T стали T[K] | null (поля остаются обязательными).
 *    - PickByValueType<T, V> — ключи объекта T, значения которых имеют тип V (в т.ч. примитивы).
 *
 * 3. Используйте эти типы для описания «слабой» версии вашей сложной структуры
 *    (например, форма редактирования с DeepPartial или ответ API с NullableValues).
 *
 * Примеры использования:
 *   interface User { id: number; name: string; address: { city: string }; }
 *   type UserForm = DeepPartial<User>;
 *   type UserApi = NullableValues<User>;
 */

// --- Сложная структура (пример: API ответ) ---
// Опишите интерфейсы для вложенной структуры (пользователь, заказы, адреса и т.д.)
// Например: UserDto с полями id, name, email, address: { city, street }, orders: OrderDto[]
// и типы ApiResponse<UserDto>, UserForm = DeepPartial<UserDto> для форм редактирования.

// --- Mapped Types (реализовать) ---

/** Сделать опциональными только ключи K из T */
export type PartialByKeys<T, K extends keyof T> = unknown; // TODO

/** Сделать обязательными только ключи K из T */
export type RequiredByKeys<T, K extends keyof T> = unknown; // TODO

/** Рекурсивно все поля опциональны; вложенные объекты — не функции */
export type DeepPartial<T> = unknown; // TODO

/** Все значения типа T становятся T[K] | null */
export type NullableValues<T> = unknown; // TODO

/** Ключи T, у которых значение имеет тип V */
export type PickByValueType<T, V> = unknown; // TODO

// --- Вспомогательная функция для тестов ---
/** Возвращает ключи объекта, значения которых имеют тип number */
export function getNumberKeys<T extends object>(obj: T): Array<PickByValueType<T, number>> {
  return Object.keys(obj).filter(
    (key) => typeof (obj as Record<string, unknown>)[key] === 'number'
  ) as Array<PickByValueType<T, number>>;
}
