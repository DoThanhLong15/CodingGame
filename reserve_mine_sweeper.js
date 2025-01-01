const width = parseInt(readline());
const height = parseInt(readline());

const map = []
const minePositions = []

for (let i = 0; i < height; i++) {
    const row = readline().split("");

    row.forEach((value, index) => {
        if(value === 'x') {
            minePositions.push([i, index]);
        }
    })

    map.push(row);
}

const isMine = ([row, col], map) => {
    return map[row][col] === 'x';
}

const isInBound = ([row, col], width, height) => {
    return row >= 0 && row < height && col >= 0 && col < width;
}

const isEmpty = ([row, col], map) => {
    return map[row][col] === '.';
}

const isNearMine = ([row, col], [rowMine, colMine]) => {
    const rowDiffer = Math.abs(row - rowMine);
    const colDiffer = Math.abs(col - colMine)

    return rowDiffer >= 0 && rowDiffer <= 1 && colDiffer >= 0 && colDiffer <= 1;
}

const markMineCount = ([row, col], map, minePositions) => {
    let count = 0;

    for (const [rowMine, colMine] of minePositions) {
        if (isNearMine([row, col], [rowMine, colMine])) {
            count++;
        }
    }

    map[row][col] = count;
}

const markMineBound = (width, height, map, minePositions) => {
    let directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

    for (const [rowMine, colMine] of minePositions) {
        for (const [x, y] of directions) {
            const newRow = rowMine + x;
            const newCol = colMine + y;

            if (isInBound([newRow, newCol], width, height) && !isMine([newRow, newCol], map) 
                && isEmpty([newRow, newCol], map)) {
                markMineCount([newRow, newCol], map, minePositions);
            }
        }
    }

    // return map;
}

const removeMinePlace = (map, minePositions) => {
    for (const [rowMine, colMine] of minePositions) {
        map[rowMine][colMine] = '.';
    }
}

console.error(width, height);
map.forEach(row => console.error(row.join("")));
console.error(minePositions);

markMineBound(width, height, map, minePositions);
removeMinePlace(map, minePositions);

map.forEach(row => console.log(row.join("")));