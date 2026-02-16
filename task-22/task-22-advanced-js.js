// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 22: JavaScript - ArrayBuffer, TypedArrays, DataView (Продвинутый уровень)
 *
 * Реализуйте функции для работы с бинарными данными:
 *
 * 1. readUint32LE(buffer, offset) - читает 32-битное беззнаковое целое (little-endian)
 *    из buffer (ArrayBuffer) по байтовому смещению offset. Возвращает число.
 *
 * 2. writeUint32LE(buffer, offset, value) - записывает value как 32-битное беззнаковое
 *    целое (little-endian) в buffer по смещению offset. Ничего не возвращает.
 *
 * 3. createFloat32ArrayFromNumbers(numbers) - создает Float32Array из массива чисел,
 *    копирует значения, возвращает новый Float32Array.
 *
 * 4. createBufferFromUint8Array(uint8Array) - создает новый ArrayBuffer и копирует
 *    в него содержимое uint8Array. Возвращает ArrayBuffer.
 *
 * 5. readInt16BE(buffer, offset) - читает 16-битное знаковое целое (big-endian)
 *    из buffer по смещению offset с помощью DataView. Возвращает число.
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

function readUint32LE(buffer, offset) {
  const view = new DataView(buffer);
  return view.getUint32(offset, true);
}

function writeUint32LE(buffer, offset, value) {
  const view = new DataView(buffer);
  view.setUint32(offset, value, true);
}

function createFloat32ArrayFromNumbers(numbers) {
  return new Float32Array(numbers);
}

function createBufferFromUint8Array(uint8Array) {
  const buffer = new ArrayBuffer(uint8Array.length);
  new Uint8Array(buffer).set(uint8Array);
  return buffer;
}

function readInt16BE(buffer, offset) {
  const view = new DataView(buffer);
  return view.getInt16(offset, false);
}

module.exports = {
  readUint32LE,
  writeUint32LE,
  createFloat32ArrayFromNumbers,
  createBufferFromUint8Array,
  readInt16BE,
};
