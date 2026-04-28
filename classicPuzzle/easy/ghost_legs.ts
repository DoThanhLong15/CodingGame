interface Diagram {
  width: number;
  height: number;
  grid: string[][];
}

const COLUMN_DISTANCE = 3;
const START_ROW = 0;
const CONNECTOR_CHAR = "-";

function parseInput(): Diagram {
  const [width, height] = readline().split(" ").map(Number);

  const grid: string[][] = [];
  for (let i = 0; i < height; i++) {
    grid.push(readline().split(""));
  }

  return { width, height, grid };
}

function debugPrint(diagram: Diagram): void {
  console.error(`Diagram: ${diagram.width}x${diagram.height}`);
  diagram.grid.forEach((row) => console.error(row.join("")));
  console.error("=======================");
}

function hasConnectorLeft(row: string[], col: number): boolean {
  return col > 0 && row[col - 1] === CONNECTOR_CHAR;
}

function hasConnectorRight(row: string[], col: number, width: number): boolean {
  return col < width - 1 && row[col + 1] === CONNECTOR_CHAR;
}

function isLastRow(row: number, height: number): boolean {
  return row === height - 1;
}

function tracePathColumn(
  grid: string[][],
  startCol: number,
  width: number,
  height: number,
): number {
  let col = startCol;

  for (let row = START_ROW + 1; row < height; row++) {
    const currentRow = grid[row];

    if (hasConnectorLeft(currentRow, col)) {
      col -= COLUMN_DISTANCE;
    } else if (hasConnectorRight(currentRow, col, width)) {
      col += COLUMN_DISTANCE;
    }
  }

  return col;
}

function extractLabels(diagram: Diagram): string[] {
  const { width, height, grid } = diagram;
  const labels: string[] = [];

  for (let startCol = 0; startCol < width; startCol += COLUMN_DISTANCE) {
    const startLabel = grid[START_ROW][startCol];
    const endCol = tracePathColumn(grid, startCol, width, height);
    const endLabel = grid[height - 1][endCol];

    labels.push(startLabel + endLabel);
  }

  return labels;
}

const diagram = parseInput();
debugPrint(diagram);
console.log(extractLabels(diagram).join("\n"));
