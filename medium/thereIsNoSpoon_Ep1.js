
const findRightNeighbor = ([startX, startY], grid, width) => {
    for(let x = startX + 1; x < width; x++) {
        if(grid[startY][x] === '0') {
            return [x, startY];
        }
    }

    return [-1, -1];
}

const findBottomNeighbor = ([startX, startY], grid, height) => {
    for(let y = startY + 1; y < height; y++) {
        if(grid[y][startX] === '0') {
            return [startX, y];
        }
    }

    return [-1, -1];
}

const width = parseInt(readline()); // the number of cells on the X axis
const height = parseInt(readline()); // the number of cells on the Y axis

const grid = []

for (let i = 0; i < height; i++) {
    grid.push(readline().split("")); // width characters, each either 0 or .
}

for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
        if(grid[y][x] === '0') {
            let currentPos = [x, y];
            let rightNeighbor = findRightNeighbor(currentPos, grid, width);
            let bottomNeighbor = findBottomNeighbor(currentPos, grid, height);

            console.log(currentPos.join(" "), rightNeighbor.join(" "), bottomNeighbor.join(" "));
        }
    }
}