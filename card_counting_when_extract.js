const streamOfConsciousness = readline().split(".");
const bustThreshold = parseInt(readline());

console.error("Stream:", streamOfConsciousness);
console.error("Bust:", bustThreshold);

const cardList = "A23456789TJQK";
const totalCard = 52;
let cardDrawn = 0;
let acceptCardDrawn = 0;

for(let seriesCard of streamOfConsciousness) {
    let tempCardDraw = 0;
    let tempAcceptCardDrawn = 0;

    for(let card of seriesCard) {
        let cardValue = cardList.indexOf(card);
    
        if(cardValue !== -1) {
            tempCardDraw += 1;
            
            if(cardValue + 1 < bustThreshold) {
                tempAcceptCardDrawn += 1;
            }
        }
        else {
            tempCardDraw = 0;
            tempAcceptCardDrawn = 0;
            break;
        }
    }

    cardDrawn += tempCardDraw;
    acceptCardDrawn += tempAcceptCardDrawn;
}

const cardExist = totalCard - cardDrawn;
const acceptCardExist = (bustThreshold - 1) * 4 - acceptCardDrawn;

console.error("----------------------");
console.error("Card draw:", cardDrawn);
console.error("Card exist:", cardExist);
console.error("Accept card draw:", acceptCardDrawn);
console.error("Accept card exist:", acceptCardExist);
console.error("----------------------");

let percentageChance = Math.round(acceptCardExist / cardExist * 100);

console.log(`${percentageChance}%`);