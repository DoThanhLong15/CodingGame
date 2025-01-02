const handleScoreNumber  = (score) => {
    return score === "-" ? 0 : parseInt(score);
}

const handleBonusScore = (gamePlay, iFrame, iBall, numberOfBonus) => {
    let frameScore = 10;

    do {
        let ball = gamePlay[iFrame][iBall];

        if(ball === undefined) {
            iBall = 0;
            iFrame++;
            continue;
        }

        if(ball === "X") {
            frameScore += 10;
        }
        else if (ball == "/") {
            preBall = gamePlay[iFrame][iBall - 1];
            frameScore += 10 - handleScoreNumber(preBall);
        }
        else {
            frameScore += handleScoreNumber(ball);
        }

        iBall++;
        numberOfBonus--;

    } while (numberOfBonus > 0);

    return frameScore;
}

const solution = (gamePlay) => {
    let scoreTotal = [];
    let score = 0;

    for(let iFrame = 0; iFrame < 10; iFrame++) {
        console.error("Frame:", gamePlay[iFrame]);
        let frameScore = 0;

        let firstBall = gamePlay[iFrame][0];

        if(firstBall === "X") {
            frameScore += handleBonusScore(gamePlay, iFrame, 1, 2);
            console.error("(X):", frameScore);
        }
        else {
            let secondBall = gamePlay[iFrame][1];

            if(secondBall == "/") {
                frameScore += handleBonusScore(gamePlay, iFrame, 2, 1);
                console.error("(/):", frameScore);
            }
            else {
                frameScore += handleScoreNumber(firstBall);
                frameScore += handleScoreNumber(secondBall);
                console.error("normal:", frameScore);
            }
        }

        score += frameScore;
        console.error("Score:", score);
        scoreTotal.push(score);

        console.error("-----------------"); 
    }
    
    return scoreTotal.join(" ");
}

const N = parseInt(readline());
console.error("Number of game: ", N);

const result = []

for (let i = 0; i < N; i++) {
    const GAME = readline();

    console.error(`Game play ${i + 1}: ${GAME}`);

    let gamePlay = GAME.split(" ");
    result.push(solution(gamePlay))
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

for(let gamePlayScore of result) {
    console.log(gamePlayScore);
}