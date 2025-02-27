const checkByLine = (grid, rowIndex, value) => {
    return grid[rowIndex].filter(item => item !== value).length === 8;
};

const checkByColumn = (grid, colIndex, value) => {
    let count = 0;

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        if (grid[rowIndex][colIndex] === value) {
            count++;
        }
    }

    return count === 1;
};

const checkByBlock = (grid, rowIndex, colIndex, value) => {
    const rowBlock = Math.floor(rowIndex / 3);
    const colBlock = Math.floor(colIndex / 3);

    let count = 0;

    for (rowIndex = rowBlock * 3; rowIndex < (rowBlock + 1) * 3; rowIndex++) {
        for (colIndex = colBlock * 3; colIndex < (colBlock + 1) * 3; colIndex++) {
            if (grid[rowIndex][colIndex] === value) {
                count++;
            }
        }
    }

    return count === 1;
};

const checkSudokuGrid = (grid) => {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            const value = grid[rowIndex][colIndex];

            if (!checkByLine(grid, rowIndex, value)
                || !checkByColumn(grid, colIndex, value)
                || !checkByBlock(grid, rowIndex, colIndex, value)) {
                console.error(rowIndex, colIndex);

                return false;
            }
        }
    }

    return true;
}

let grid = [];
for (let i = 0; i < 9; i++) {
    grid.push(readline().split(' ').map(Number));
};

grid.forEach(row => {
    console.error(row.join(" "));
});

console.log(checkSudokuGrid(grid));
