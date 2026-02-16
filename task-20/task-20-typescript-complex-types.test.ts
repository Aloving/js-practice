// @no-ai-suggestions
// @disable-autocomplete
import {
  PartialByKeys,
  RequiredByKeys,
  DeepPartial,
  NullableValues,
  PickByValueType,
  getNumberKeys,
} from './task-20-typescript-complex-types';

describe('Task 20: TypeScript — Сложные структуры и Mapped Types', () => {
  describe('PartialByKeys', () => {
    test('значение с частичными ключами допустимо', () => {
      interface Foo {
        a: number;
        b: string;
        c: boolean;
      }
      type Part = PartialByKeys<Foo, 'a' | 'c'>;
      const x: Part = { b: 'x' } as Part;
      expect(x.b).toBe('x');
    });
  });

  describe('RequiredByKeys', () => {
    test('значение с обязательным a допустимо', () => {
      interface Foo {
        a?: number;
        b?: string;
      }
      type Req = RequiredByKeys<Foo, 'a'>;
      const x: Req = { a: 1 } as Req;
      expect(x.a).toBe(1);
    });
  });

  describe('DeepPartial', () => {
    test('вложенный объект может быть частичным', () => {
      interface Nested {
        x: number;
        inner: { y: string };
      }
      type Part = DeepPartial<Nested>;
      const p: Part = { inner: {} } as Part;
      expect(p.inner).toEqual({});
    });
  });

  describe('NullableValues', () => {
    test('значения могут быть null', () => {
      interface Foo {
        a: number;
        b: string;
      }
      type Nullable = NullableValues<Foo>;
      const n: Nullable = { a: null, b: null } as Nullable;
      expect(n.a).toBeNull();
      expect(n.b).toBeNull();
    });
  });

  describe('PickByValueType и getNumberKeys', () => {
    test('getNumberKeys возвращает только ключи с number', () => {
      const obj = { a: 1, b: 'x', c: 2, d: true };
      const keys = getNumberKeys(obj);
      expect(keys).toContain('a');
      expect(keys).toContain('c');
      expect(keys).not.toContain('b');
      expect(keys).not.toContain('d');
      expect(keys.length).toBe(2);
    });
  });
});
