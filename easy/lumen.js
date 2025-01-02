const fs = require("fs");

const parseInput = (input) => {
    const lines = input.split("\n");

    const squareWidth = parseInt(lines.shift());
    const lightStrengh = parseInt(lines.shift());

    const roomMap = lines.splice(0, squareWidth)
                        .map(line => line.split(" "));

    const candlesPositions = [];
    roomMap.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (col === 'C') {
                candlesPositions.push([rowIndex, colIndex]);
            }
        });
    });

    return [squareWidth, lightStrengh, roomMap, candlesPositions];
}

const findLightBoundary = (index, squareWidth, lightStrengh) => {
    const min = (index - lightStrengh + 1) < 0 ? 0: (index - lightStrengh + 1);
    const max = (index + lightStrengh - 1) >= squareWidth ? squareWidth - 1: (index + lightStrengh - 1);

    return [min, max];
}

const markPlaceHasLight = (startRow, startCol, endRow, endCol, roomMap) => {
    for(let i = startRow; i <= endRow; i++) {
        for(let j = startCol; j <= endCol; j++) {
            if(roomMap[i][j] !== 'C')
                roomMap[i][j] = '.';
        }
    }
}

const handlePlaceHasLight = (lightRow, lightCol, squareWidth, lightStrengh, roomMap) => {
    const [minRow, maxRow] = findLightBoundary(lightRow, squareWidth, lightStrengh);
    const [minCol, maxCol] = findLightBoundary(lightCol, squareWidth, lightStrengh);

    markPlaceHasLight(minRow, minCol, maxRow, maxCol, roomMap);
}

const countPlaceHasZeroLight = (squareWidth, lightStrengh, roomMap, candlesPositions) => {
    for(const [row, col] of candlesPositions) {
        handlePlaceHasLight(row, col, squareWidth, lightStrengh, roomMap);
    }

    return roomMap.map(row => row.filter(value => value === 'X')).reduce((count, row) => count+= row.length, 0);
}

const [squareWidth, lightStrengh, roomMap, candlesPositions] = parseInput(fs.readFileSync(0).toString());

const answer = countPlaceHasZeroLight(squareWidth, lightStrengh, roomMap, candlesPositions);

console.log(answer);
