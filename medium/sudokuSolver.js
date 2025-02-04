
const findEmpty = (grid) => {
    for(let row = 0; row < 9; row++) {
        for(let col = 0; col < 9; col++) {
            if(grid[row][col] === 0) {
                return [row, col];
            }
        }
    }

    return false;
}

const isSafe = (row, col, value, grid) => {
    for(let rowIndex = 0; rowIndex < 9; rowIndex++) {
        if(grid[rowIndex][col] === value) {
            return false;
        }
    }

    for(let colIndex = 0; colIndex < 9; colIndex++) {
        if(grid[row][colIndex] === value) {
            return false;
        }
    }

    const rowBlock = Math.floor(row / 3);
    const colBlock = Math.floor(col / 3);
    for(let rowIndex = rowBlock * 3; rowIndex < (rowBlock + 1) * 3; rowIndex++) {
        for(let colIndex = colBlock * 3; colIndex < (colBlock + 1) * 3; colIndex++) {
            if(grid[rowIndex][colIndex] === value) {
                return false;
            }
        }
    }

    return true;
}

const solveSudoKu = (grid) => {
    if(!findEmpty(grid)) {
        return true;
    }

    let [row, col] = findEmpty(grid);

    for(let value = 1; value <= 9; value++) {
        if(isSafe(row, col, value, grid)) {
            grid[row][col] = value;

            if(solveSudoKu(grid)) {
                return true;
            }

            grid[row][col] = 0;
        }
    }

    return false;
}

const grid = [];
for (let i = 0; i < 9; i++) {
    grid.push(readline().split("").map(Number));
}

if(solveSudoKu(grid)) {
    grid.forEach(row => console.log(row.join("")));
}