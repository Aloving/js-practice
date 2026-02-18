// @no-ai-suggestions
// @disable-autocomplete
const { MinHeap } = require('./task-29-data-structures-minheap');

describe('Task 29: MinHeap (куча минимума)', () => {
  test('экспортирует MinHeap', () => {
    expect(typeof MinHeap).toBe('function');
  });

  test('пустая куча: peek и extractMin возвращают undefined', () => {
    const heap = new MinHeap();
    expect(heap.peek()).toBeUndefined();
    expect(heap.extractMin()).toBeUndefined();
    expect(heap.size()).toBe(0);
  });

  test('insert и peek: минимум наверху', () => {
    const heap = new MinHeap();
    heap.insert(3);
    heap.insert(1);
    heap.insert(2);
    expect(heap.peek()).toBe(1);
    expect(heap.size()).toBe(3);
  });

  test('extractMin извлекает в порядке возрастания', () => {
    const heap = new MinHeap();
    heap.insert(5);
    heap.insert(2);
    heap.insert(8);
    heap.insert(1);
    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(2);
    expect(heap.extractMin()).toBe(5);
    expect(heap.extractMin()).toBe(8);
    expect(heap.extractMin()).toBeUndefined();
  });

  test('size после операций', () => {
    const heap = new MinHeap();
    heap.insert(10);
    heap.insert(20);
    expect(heap.size()).toBe(2);
    heap.extractMin();
    expect(heap.size()).toBe(1);
  });
});
