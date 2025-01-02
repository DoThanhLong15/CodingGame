const fs = require("fs");

/**
 * 
 * @param {string} input 
 * @returns {char, char[]}
 */
const parseInput = (input) => {
    const lines = input.split("\n");

    const orderList = lines.shift().split("");
    const orderSide = lines.shift();

    return [orderSide, orderList];
}


/**
 * 
 * @param {char} orderSide 
 * @param {char[]} orderList 
 * @returns {number}
 */
const foldPaperByOrder = (orderSide, orderList) => {
    const paperSheet = {
        'U': {
            'numberOfLayer': 1,
            'oppositeSide': 'D'
        },
        'D': {
            'numberOfLayer': 1,
            'oppositeSide': 'U'
        },
        'R': {
            'numberOfLayer': 1,
            'oppositeSide': 'L'
        },
        'L': {
            'numberOfLayer': 1,
            'oppositeSide': 'R'
        },
    };

    for (const order of orderList) {
        const orderOppositeSide = paperSheet[order].oppositeSide;

        for(const side in paperSheet) {
            if(side !== order && side !== orderOppositeSide) {
                paperSheet[side].numberOfLayer *= 2;
            }
        }

        paperSheet[orderOppositeSide].numberOfLayer += paperSheet[order].numberOfLayer;
        paperSheet[order].numberOfLayer = 1;
    }

    return paperSheet[orderSide].numberOfLayer;
}

const [orderSide, orderList] = parseInput(fs.readFileSync(0).toString());

console.log(foldPaperByOrder(orderSide, orderList));