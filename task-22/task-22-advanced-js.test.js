// @no-ai-suggestions
// @disable-autocomplete
const {
  readUint32LE,
  writeUint32LE,
  createFloat32ArrayFromNumbers,
  createBufferFromUint8Array,
  readInt16BE,
} = require('./task-22-advanced-js');

describe('Task 22: JavaScript - ArrayBuffer, TypedArrays, DataView', () => {
  test('должен экспортировать все необходимые функции', () => {
    expect(typeof readUint32LE).toBe('function');
    expect(typeof writeUint32LE).toBe('function');
    expect(typeof createFloat32ArrayFromNumbers).toBe('function');
    expect(typeof createBufferFromUint8Array).toBe('function');
    expect(typeof readInt16BE).toBe('function');
  });

  describe('readUint32LE / writeUint32LE', () => {
    test('записывает и читает Uint32 LE', () => {
      const buffer = new ArrayBuffer(8);
      writeUint32LE(buffer, 0, 0x12345678);
      expect(readUint32LE(buffer, 0)).toBe(0x12345678);
    });

    test('читает по смещению', () => {
      const buffer = new ArrayBuffer(8);
      writeUint32LE(buffer, 4, 0xaabbccdd);
      expect(readUint32LE(buffer, 4)).toBe(0xaabbccdd);
    });
  });

  describe('createFloat32ArrayFromNumbers', () => {
    test('создает Float32Array из массива чисел', () => {
      const arr = createFloat32ArrayFromNumbers([1.5, 2.5, 3.5]);
      expect(arr).toBeInstanceOf(Float32Array);
      expect(arr.length).toBe(3);
      expect(arr[0]).toBeCloseTo(1.5);
      expect(arr[1]).toBeCloseTo(2.5);
      expect(arr[2]).toBeCloseTo(3.5);
    });

    test('пустой массив даёт пустой Float32Array', () => {
      const arr = createFloat32ArrayFromNumbers([]);
      expect(arr.length).toBe(0);
    });
  });

  describe('createBufferFromUint8Array', () => {
    test('копирует Uint8Array в новый ArrayBuffer', () => {
      const u8 = new Uint8Array([1, 2, 3, 4, 5]);
      const buf = createBufferFromUint8Array(u8);
      expect(buf).toBeInstanceOf(ArrayBuffer);
      expect(buf.byteLength).toBe(5);
      const view = new Uint8Array(buf);
      expect(Array.from(view)).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('readInt16BE', () => {
    test('читает 16-битное знаковое целое big-endian', () => {
      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);
      view.setInt16(0, 0x1234, false); // big-endian
      expect(readInt16BE(buffer, 0)).toBe(0x1234);
    });

    test('читает отрицательное число', () => {
      const buffer = new ArrayBuffer(2);
      const view = new DataView(buffer);
      view.setInt16(0, -100, false);
      expect(readInt16BE(buffer, 0)).toBe(-100);
    });
  });
});
