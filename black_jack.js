/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const checkTenPoint = (card) => {
    const acceptCardList = ["10", "J", "Q", "K"];

    return acceptCardList.find(value => value == card);
}

const checkBlackJack = (cardList) => {
    if(cardList.length > 2) {
        return false;
    }

    let newCardList = cardList.filter(card => card != "A");

    if(newCardList.length == 2 || newCardList.length == 0) {
        return false;
    }

    if(checkTenPoint(newCardList[0])) {
        return true;
    }

    return false;
}

const calculateCardPoint = (cardList) => {
    let result = "";

    if(cardList.length == 2 && checkBlackJack(cardList)) {
        result = "Blackjack!";
    }
    else {
        let score = 0;
        let numberOfACard = 0;

        for(let card of cardList) {
            if(checkTenPoint(card)) {
                score += 10;
            }
            else if (card === "A") {
                numberOfACard++;
            }
            else {
                score += parseInt(card);
            }
        }

        if(numberOfACard) {
            score += 11 + (numberOfACard - 1);

            if(score > 21) {
                score -= 10;
            }
        }

        result += score;
    }

    return result;
}

const bankCards = readline().split(" ");
const playerCards = readline().split(" ");

console.error("bank:", bankCards);
console.error("player:", playerCards);
console.error("----------------------");

let result = "";
let bankStatus = calculateCardPoint(bankCards);
let playerStatus = calculateCardPoint(playerCards);

console.error("Bank:", bankStatus);
console.error("Player:", playerStatus);

if(bankStatus == playerStatus && bankStatus <= 21) {
    result = "Draw";
}
else if (bankStatus == "Blackjack!" || playerStatus == "Blackjack!"){
    result = bankStatus == playerStatus ? "Draw": "Blackjack!";
}
else {
    let bankScore = parseInt(bankStatus);
    let playerScore = parseInt(playerStatus);

    if (bankScore > 21 && playerScore > 21) {
        result = "Bank"; 
    } else if (bankScore <= 21 && (bankScore > playerScore || playerScore > 21)) {
        result = "Bank";
    } else if (playerScore <= 21 && (playerScore > bankScore || bankScore > 21)) {
        result = "Player"; 
    } else {
        result = "Draw";
    }
}

console.error("----------------------");

console.log(result);