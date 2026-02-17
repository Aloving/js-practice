// @no-ai-suggestions
// @disable-autocomplete
/**
 * ЗАДАЧА 27: Алгоритмы — графы и BFS (высокий уровень)
 *
 * 1. shortestPathInGrid(grid, start, end) — кратчайший путь в 2D-сетке.
 *    grid — массив строк или массив массивов (0 — проходимо, 1 — стена).
 *    start, end — [row, col]. Вернуть длину пути (число шагов) или -1 если пути нет.
 *    Шаги только вверх/вниз/влево/вправо.
 *
 * 2. numIslands(grid) — количество «островов». grid: 2D массив, '1' или 1 — земля, '0' или 0 — вода.
 *    Остров — связные по вертикали/горизонтали единицы. Вернуть число островов.
 *
 * 3. bfsLevelOrder(adjList, start) — обход в ширину от вершины start.
 *    adjList — объект: ключ — вершина, значение — массив соседей. Вернуть массив вершин в порядке BFS.
 *
 * 4. hasPath(adjList, start, end) — есть ли путь от start до end в графе (неориентированном).
 *    adjList как выше. Вернуть true/false.
 */

// ВАШЕ РЕШЕНИЕ ЗДЕСЬ

function shortestPathInGrid(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;
  const get = (r, c) => (typeof grid[r][c] === 'string' ? grid[r][c] : grid[r][c]);
  const blocked = (r, c) => r < 0 || r >= rows || c < 0 || c >= cols || get(r, c) === 1 || get(r, c) === '1';
  const queue = [[start[0], start[1], 0]];
  const seen = new Set([`${start[0]},${start[1]}`]);
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  while (queue.length) {
    const [r, c, dist] = queue.shift();
    if (r === end[0] && c === end[1]) return dist;
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      const key = `${nr},${nc}`;
      if (!blocked(nr, nc) && !seen.has(key)) {
        seen.add(key);
        queue.push([nr, nc, dist + 1]);
      }
    }
  }
  return -1;
}

function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  const visit = (r, c) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const v = grid[r][c];
    if (v === 0 || v === '0') return;
    grid[r][c] = '0';
    visit(r + 1, c);
    visit(r - 1, c);
    visit(r, c + 1);
    visit(r, c - 1);
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = grid[r][c];
      if (v === 1 || v === '1') {
        count++;
        visit(r, c);
      }
    }
  }
  return count;
}

function bfsLevelOrder(adjList, start) {
  const result = [];
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  while (queue.length) {
    const node = queue.shift();
    result.push(node);
    const neighbors = adjList[node] || [];
    for (const n of neighbors) {
      if (!visited.has(n)) {
        visited.add(n);
        queue.push(n);
      }
    }
  }
  return result;
}

function hasPath(adjList, start, end) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  while (queue.length) {
    const node = queue.shift();
    if (node === end) return true;
    const neighbors = adjList[node] || [];
    for (const n of neighbors) {
      if (!visited.has(n)) {
        visited.add(n);
        queue.push(n);
      }
    }
  }
  return false;
}

module.exports = {
  shortestPathInGrid,
  numIslands,
  bfsLevelOrder,
  hasPath,
};
