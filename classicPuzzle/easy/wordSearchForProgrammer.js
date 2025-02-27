
const isInBound = ([row, col], size) => {
    return row >= 0 && row < size && col >= 0 && col < size;
}

const checkClueOfGrid = ([row, col], [dRow, dCol], grid, size, letter, letterIndex, newGrid) => {
    if (letterIndex >= letter.length) {
        return true;
    }

    if (!isInBound([row, col], size)) {
        return false;
    }

    if (grid[row][col] === letter[letterIndex] &&
        checkClueOfGrid([row + dRow, col + dCol], [dRow, dCol], grid, size, letter, letterIndex + 1, newGrid)) {
        newGrid[row][col] = grid[row][col];
        return true;
    }

    return false;
}

const size = parseInt(readline());
const grid = [];
for (let i = 0; i < size; i++) {
    grid.push(readline().split(""));
}
const clues = readline().split(" ");

grid.forEach(row => console.error(row.join("")));
console.error("--------------------------");

console.error(clues.join(" "));
console.error("--------------------------");

const newGrid = Array.from({ length: size }, () => Array(size).fill(" "));

for (let clue of clues) {
    clue = clue.toUpperCase();
    let a = [];
    let count = 0;

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const gridChar = grid[row][col];

            if (gridChar === clue[0]) {
                let directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

                for (let [dRow, dCol] of directions) {
                    if (checkClueOfGrid([row + dRow, col + dCol], [dRow, dCol], grid, size, clue, 1, newGrid)) {
                        newGrid[row][col] = gridChar;
                    }
                }
            }
        }
    }
}

newGrid.forEach(row => console.log(row.join("")));