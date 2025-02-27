const isInMap = (row, col, mapWidth) => {
    return row >= 0 && row < mapWidth && col >= 0 && col < mapWidth;
}

const exploreIslandCoastWidth = (startRow, startCol, map, mapWidth) => {
    let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    const visitedIslanBlock = new Set();
    visitedIslanBlock.add(`${startRow} ${startCol}`);

    const coastList = new Set();
    let islandBlockIndex = 0;

    while (islandBlockIndex < visitedIslanBlock.size) {
        [startRow, startCol] = Array.from(visitedIslanBlock)[islandBlockIndex].split(" ").map(Number);

        map[startRow][startCol] = "A";

        for (const [dRow, dCol] of directions) {
            let row = startRow + dRow;
            let col = startCol + dCol;

            if (isInMap(row, col, mapWidth)) {
                switch (map[row][col]) {
                    case "#":
                        visitedIslanBlock.add(`${row} ${col}`);
                        break;
                    case "~":
                        coastList.add(`${row} ${col}`);
                        break;
                }
            }
        }

        islandBlockIndex++;
    }

    // console.error(visitedIslanBlock);
    // console.error(coastList);
    // console.error("---------------------");

    return coastList.size;
}

const n = parseInt(readline());
const map = [];
for (let i = 0; i < n; i++) {
    map.push(readline().split(""));
}

map.forEach(row => console.error(row.join("")))
console.error("---------------------");

let islandCount = 0;
const islandList = [];
let longestCoast = [1, 0];

for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
        if (map[row][col] === "#") {
            islandCount++;
            const coastWidth = exploreIslandCoastWidth(row, col, map, n);

            // islandList.push({
            //     "index": islandCount,
            //     "coastWidth": exploreIslandCoastWidth(row, col, map, n)
            // });

            if(longestCoast[1] < coastWidth) {
                longestCoast[0] = islandCount;
                longestCoast[1] = coastWidth;
            }
        }
    }
}

// console.error(islandList);
// console.error("---------------------");

console.log(longestCoast.join(" "));