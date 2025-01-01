const fs = require('fs');

/**
 * 
 * @param {string} input 
 * @returns {[number, number, [char[]]]}
 */
const parseInput = (input) => {
    const lines = input.split("\n");

    const [gridWidth, gridHeight] = lines.shift().split(" ");

    /**
     * @type {[char[]]}
     */
    const grid = lines.splice(0, gridHeight)
                    .map(line => line.split(""));

    return [gridWidth, gridWidth, grid];
}

/**
 * 
 * @param {number} gridWidth 
 * @param {number} gridHeight 
 * @param {[char[]]} grid 
 * @returns 
 */
const solution = (gridWidth, gridHeight, grid) => {

    /**
     * 
     * @param {number} rowIndex 
     * @param {number} colIndex 
     * @returns {boolean}
     */
    const isInGrid = (rowIndex, colIndex) => {
        return rowIndex >= 0 && rowIndex < gridHeight && colIndex >= 0 && colIndex < gridWidth;
    }


    /**
     * 
     * @param {number} rowIndex 
     * @param {number} colIndex 
     * @returns {boolean}
     */
    const isPassage = (rowIndex, colIndex) => {
        return parseInt(grid[rowIndex][colIndex]) >= 0;
    }


    /**
     * 
     * @param {number} rowIndex 
     * @param {number} colIndex 
     * @returns {number}
     */
    const countAdjacentPassage = (rowIndex, colIndex) => {
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        let count = 0;

        for(const [x, y] of directions) {
            const newRow = rowIndex + x;
            const newCol = colIndex + y;
          
            if(isInGrid(newRow, newCol) && isPassage(newRow, newCol)) {
                count++;
            }
        }

        return count;
    }

    for(let row = 0; row < gridHeight; row++) {
        for(let col = 0; col < gridWidth; col++) {
            if(grid[row][col] === "0") {
                grid[row][col] = countAdjacentPassage(row, col);
            }
        }
    }

    return grid;
}

const [gridWidth, gridHeight, grid] = parseInput(fs.readFileSync(0).toString());

solution(gridWidth, gridHeight, grid).forEach(line => console.log(line.join("")));