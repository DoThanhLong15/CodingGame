const ASTEROID_PRIORITIES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const EMPTY_CELL = ".";

type Grid = string[][];
type AsteroidMap = Record<string, Position>;

interface Position {
  row: number;
  col: number;
}

interface SimulationInput {
  width: number;
  height: number;
  firstGrid: Grid;
  secondGrid: Grid;
  t1: number;
  t2: number;
  t3: number;
}

function parseInput(): SimulationInput {
  const [width, height, t1, t2, t3] = readline().split(" ").map(Number);

  const firstGrid: Grid = [];
  const secondGrid: Grid = [];

  for (let i = 0; i < height; i++) {
    const [first, second] = readline().split(" ");
    firstGrid.push(first.split(""));
    secondGrid.push(second.split(""));
  }

  return { width, height, firstGrid, secondGrid, t1, t2, t3 };
}

function generateThirdGrid(input: SimulationInput): Grid {
  const { width, height, firstGrid, secondGrid, t1, t2, t3 } = input;

  const firstAsteroids = extractAsteroids(firstGrid);
  const secondAsteroids = extractAsteroids(secondGrid);

  const predictedAsteroids: AsteroidMap = {};

  for (const key in firstAsteroids) {
    const start = firstAsteroids[key];
    const mid = secondAsteroids[key];

    const velocity = calculateVelocity(start, mid);
    const scale = computeTimeScale(t2 - t1, t3 - t2);

    predictedAsteroids[key] = predictPosition(mid, velocity, scale);
  }

  const resultGrid = createEmptyGrid(width, height);
  placeAsteroids(resultGrid, predictedAsteroids);

  return resultGrid;
}

function extractAsteroids(grid: Grid): AsteroidMap {
  const result: AsteroidMap = {};

  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell !== EMPTY_CELL) {
        result[cell] = { row: r, col: c };
      }
    });
  });

  return result;
}

function calculateVelocity(from: Position, to: Position): Position {
  return {
    row: to.row - from.row,
    col: to.col - from.col,
  };
}

function computeTimeScale(delta1: number, delta2: number): number {
  return delta1 === delta2 ? 1 : delta2 / delta1;
}

function predictPosition(
  current: Position,
  velocity: Position,
  scale: number,
): Position {
  return {
    row: current.row + Math.floor(velocity.row * scale),
    col: current.col + Math.floor(velocity.col * scale),
  };
}

function createEmptyGrid(width: number, height: number): Grid {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => EMPTY_CELL),
  );
}

function placeAsteroids(grid: Grid, asteroids: AsteroidMap): void {
  const height = grid.length;
  const width = grid[0].length;

  for (const [name, pos] of Object.entries(asteroids)) {
    if (!isInsideGrid(pos, width, height)) continue;

    const current = grid[pos.row][pos.col];

    if (shouldReplace(current, name)) {
      grid[pos.row][pos.col] = name;
    }
  }
}

function isInsideGrid(pos: Position, width: number, height: number): boolean {
  return pos.row >= 0 && pos.row < height && pos.col >= 0 && pos.col < width;
}

function shouldReplace(current: string, incoming: string): boolean {
  if (current === EMPTY_CELL) return true;

  return getPriority(incoming) < getPriority(current);
}

function getPriority(asteroid: string): number {
  return ASTEROID_PRIORITIES.indexOf(asteroid);
}

const input = parseInput();
const result = generateThirdGrid(input);

result.forEach((row) => console.log(row.join("")));
