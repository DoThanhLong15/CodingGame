interface Plot {
  height: number;
  isVisited: boolean;
}

interface Input {
  mapSize: number;
  plotMap: Plot[][];
}

const DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const TARGET_HEIGHT = 0;
const MAX_HEIGHT_DIFF = 1;

function handleInput(): Input {
  const mapSize = parseInt(readline());
  const plotMap = Array.from({ length: mapSize }, () => {
    const heights = readline().split(' ').map(Number);
    return heights.map(height => ({ height, isVisited: false }));
  });

  return { mapSize, plotMap };
}

function getStartPosition(mapSize: number): number {
  return Math.floor(mapSize / 2);
}

function isInBounds(row: number, col: number, mapSize: number): boolean {
  return row >= 0 && row < mapSize && col >= 0 && col < mapSize;
}

function solve(input: Input): boolean {
  const { mapSize, plotMap } = input;
  const start = getStartPosition(mapSize);
  
  const queue: [number, number][] = [[start, start]];
  plotMap[start][start].isVisited = true;

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;
    const currentHeight = plotMap[row][col].height;

    if (currentHeight === TARGET_HEIGHT) {
      return true;
    }

    for (const [dRow, dCol] of DIRECTIONS) {
      const nextRow = row + dRow;
      const nextCol = col + dCol;

      if (!isInBounds(nextRow, nextCol, mapSize)) continue;

      const nextPlot = plotMap[nextRow][nextCol];
      if (nextPlot.isVisited) continue;
      if (Math.abs(nextPlot.height - currentHeight) > MAX_HEIGHT_DIFF) continue;

      nextPlot.isVisited = true;
      queue.push([nextRow, nextCol]);
    }
  }

  return false;
}

const input = handleInput();
const result = solve(input) ? "yes" : "no";
console.log(result);