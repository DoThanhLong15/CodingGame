const cardValues = {
    1: 10,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
}
const cardSuits = "DHCS";

const player1 = {
    cards: [],
    winCount: 0
}

const player2 = {
    cards: [],
    winCount: 0
}

const n = parseInt(readline()); // the number of cards for player 1
for (let i = 0; i < n; i++) {
    player1.cards.push(readline()); // the n cards of player 1
}

const m = parseInt(readline()); // the number of cards for player 2
for (let i = 0; i < m; i++) {
    player2.cards.push(readline()); // the m cards of player 2
}

console.error(player1.cards.join(" "));
console.error(player2.cards.join(" "));
console.error('-------------------------------------');

let isPAT = false;
let turn = 0;
while (player1.cards.length > 0 && player2.cards.length > 0 && !isPAT) {
    const playerCard1 = player1.cards.shift();
    const playerCard2 = player2.cards.shift();

    turn++;

    if (playerCard1[0] !== playerCard2[0]) {
        let cardValue1 = cardValues[playerCard1[0]];
        let cardValue2 = cardValues[playerCard2[0]];

        if (cardValue1 > cardValue2) {
            player1.winCount += 1;
            player1.cards.push(playerCard1, playerCard2);

            console.error(turn, "-->", "1 -", [playerCard1, playerCard2]);
        }
        else {
            player2.winCount += 1;
            player2.cards.push(playerCard1, playerCard2);

            console.error(turn, "-->", "2 -", [playerCard1, playerCard2]);
        }
    }
    else {
        const faceDownCards1 = [playerCard1];
        const faceDownCards2 = [playerCard2];
        let faceDownNum = 0;

        do {
            while (faceDownNum < 3 && player1.cards.length > 0 && player2.cards.length > 0) {
                faceDownCards1.push(player1.cards.shift());
                faceDownCards2.push(player2.cards.shift());
                faceDownNum++;
            }

            if (faceDownNum < 3 || player1.cards.length === 0 || player2.cards.length === 0) {
                isPAT = true;
                break;
            }

            let newPlayerCard1 = player1.cards.shift();
            let newPlayerCard2 = player2.cards.shift();

            if (newPlayerCard1[0] !== newPlayerCard2[0]) {
                let cardValue1 = cardValues[newPlayerCard1[0]];
                let cardValue2 = cardValues[newPlayerCard2[0]];

                if (cardValue1 > cardValue2) {
                    player1.winCount += 1;
                    player1.cards.push(...faceDownCards1, newPlayerCard1);
                    player1.cards.push(...faceDownCards2, newPlayerCard2);
                }
                else {
                    player2.winCount += 1;
                    player2.cards.push(...faceDownCards1, newPlayerCard1);
                    player2.cards.push(...faceDownCards2, newPlayerCard2);
                }

                break;
            }

            faceDownCards1.push(newPlayerCard1);
            faceDownCards2.push(newPlayerCard2);
            faceDownNum = 0;

        } while (true);
    }

    // console.error(player1.cards.join(" "));
    // console.error(player2.cards.join(" "));
    // console.error('-------------------------------------');
}
console.error(player1.cards.join(" "));
console.error(player2.cards.join(" "));
console.error('-------------------------------------');

if (isPAT) {
    console.log("PAT");
}
else {
    console.log(player1.cards.length > player2.cards.length ? '1 ' + turn : '2 ' + turn);
}