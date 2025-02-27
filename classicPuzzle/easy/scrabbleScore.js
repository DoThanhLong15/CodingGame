/**
 * Compute how many points you scored with your new words !
 **/
const tileSet = {}

const nbTiles = parseInt(readline()); // Number of tiles in the tile set
for (let i = 0; i < nbTiles; i++) {
    var inputs = readline().split(' ');
    const character = inputs[0];
    const score = parseInt(inputs[1]);

    tileSet[character] = score;
}

// console.error(tileSet);

var inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);

// console.error(width, height)

const emptyBoardRows = []
for (let i = 0; i < height; i++) {
    emptyBoardRows.push(readline().split("")); // Empty board with special cells
}
// emptyBoardRows.forEach(row => console.error(row.join("")))
// console.error("-----------------------")

const previousWordBoardRows = []
for (let i = 0; i < height; i++) {
    previousWordBoardRows.push(readline().split("")); // Words already played
}
// previousWordBoardRows.forEach(row => console.error(row.join("")))
// console.error("-----------------------")

const playedWordBoardRows = []
for (let i = 0; i < height; i++) {
    playedWordBoardRows.push(readline().split("")); // Words after you play
}
// playedWordBoardRows.forEach(row => console.error(row.join("")))
// console.error("-----------------------")

const findNewWordInRow = ([rowIndex, colIndex], tile, width, playedBoard) => {
    const charList = [{
        "value": tile,
        "row": rowIndex,
        "col": colIndex
    }];

    for (let col = colIndex - 1; col >= 0; col--) {
        let char = playedBoard[rowIndex][col];

        if (char === ".") {
            break;
        }

        charList.unshift({
            "value": char,
            "row": rowIndex,
            "col": col
        });
    }

    for (let col = colIndex + 1; col < width; col++) {
        let char = playedBoard[rowIndex][col];

        if (char === ".") {
            break;
        }

        charList.push({
            "value": char,
            "row": rowIndex,
            "col": col
        });
    }

    return charList;
}

const findNewWordInCol = ([rowIndex, colIndex], tile, height, playedBoard) => {
    const charList = [{
        "value": tile,
        "row": rowIndex,
        "col": colIndex
    }];

    for (let row = rowIndex - 1; row >= 0; row--) {
        let char = playedBoard[row][colIndex];

        if (char === ".") {
            break;
        }

        charList.unshift({
            "value": char,
            "row": row,
            "col": colIndex
        });
    }

    for (let row = rowIndex + 1; row < height; row++) {
        let char = playedBoard[row][colIndex];

        if (char === ".") {
            break;
        }

        charList.push({
            "value": char,
            "row": row,
            "col": colIndex
        });
    }

    return charList;
}

const getWordFromCharList = (charList) => {
    return charList.reduce((word, char) => word += char.value, "");
}

const calculateWordScore = (charListInfo) => {
    let numberOfW = 1;
    let sum = 0;

    for (let charInfo of charListInfo) {
        const rowIndex = charInfo.row;
        const colIndex = charInfo.col;

        let numberOfL = 1;

        if (playedWordBoardRows[rowIndex][colIndex] !== previousWordBoardRows[rowIndex][colIndex]) {
            switch (emptyBoardRows[rowIndex][colIndex]) {
                case 'w':
                    numberOfW *= 2;
                    break;
                case 'W':
                    numberOfW *= 3;
                    break;
                case 'l':
                    numberOfL = 2;
                    break;
                case 'L':
                    numberOfL = 3;
                    break;
            }
        }

        sum += tileSet[charInfo.value] * numberOfL;
    }

    return sum * numberOfW;
}

let countNewTile = 0;
const wordList = [];
for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    for (let colIndex = 0; colIndex < width; colIndex++) {
        if (playedWordBoardRows[rowIndex][colIndex] !== previousWordBoardRows[rowIndex][colIndex]) {
            let tile = playedWordBoardRows[rowIndex][colIndex];

            let wordOfRow = findNewWordInRow([rowIndex, colIndex], tile, width, playedWordBoardRows);
            let wordOfCol = findNewWordInCol([rowIndex, colIndex], tile, height, playedWordBoardRows);

            // console.error(tile, [rowIndex, colIndex])
            // console.error('row', wordOfRow);
            // console.error('col', wordOfCol);
            // console.error("-----------------------")

            if (wordOfCol.length > 1) {
                let word = getWordFromCharList(wordOfCol);

                if (wordList.every(([wordItem,]) => wordItem !== word)) {
                    wordList.push([word, wordOfCol]);
                }
            }

            if (wordOfRow.length > 1) {
                let word = getWordFromCharList(wordOfRow);

                if (wordList.every(([wordItem,]) => wordItem !== word)) {
                    wordList.push([word, wordOfRow]);
                }
            }

            countNewTile = (wordOfCol.length > 1 || wordOfRow.length > 1) ? countNewTile + 1 : countNewTile;
        }
    }
}

console.error(wordList)
console.error("-----------------------")

// console.error(tileSet);
// console.error("-----------------------")

wordList.sort(([word1,], [word2,]) => word1.localeCompare(word2));

let total = 0;
for (let [word, charList] of wordList) {
    let score = calculateWordScore(charList);

    console.log(`${word} ${score}`);

    total += score;
}

if (countNewTile >= 7) {
    console.log("Bonus 50");

    total += 50;
}

console.log("Total", total);