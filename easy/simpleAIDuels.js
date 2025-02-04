const xList = [12]
const getRandomAction = (turn) => {
    const a = 137;
    const b = 187;
    const m = 256;

    let x = (a * xList[turn] + b) % m;
    xList.push(x);

    const binary = x.toString(2);
    const countOnes = binary.split('').filter(bit => bit === '1').length;

    return countOnes % 2 === 0 ? "D" : "C";
}

const isMaxPlayAction = (AIplay, action) => {
    return AIplay.filter(AIaction => AIaction === action).length > (AIplay.length / 2) ? true : false;
}

const checkMostLastNTurnAIOppPlay = (AIplay, n, action) => {
    let count = 0;
    let startIndex = (AIplay.length - n - 1) > 0 ? (AIplay.length - n - 1) : 0;

    for (let i = startIndex; i < AIplay.length; i++) {
        if (AIplay[i] === action) {
            count++;
        }
    }

    return count >= (AIplay.length - startIndex) / 2;
}

const selectActionFromStrategy = ([AIplay, AIstrategy, AIscore], [AIopPlay, AIopScore], turn) => {
    for (let strategy of AIstrategy) {
        let action = "";

        if ((turn === 0 && strategy[0] === "START") || strategy[0] === "*") {
            action = strategy[1];
        }
        else if (strategy[0] === "ME" && strategy[1] === "WIN" && AIscore > AIopScore) {
            action = strategy[2];
        }
        else if (strategy[0] === "ME" && strategy[1] === "MAX" && isMaxPlayAction(AIplay, strategy[2])) {
            action = strategy[3];
        }
        else if (strategy[0] === "ME" && strategy[1] === "-1"
            && turn - 1 >= 0 && AIplay[turn - 1] === strategy[2])
            action = strategy[3];
        else if (strategy[0] === "OPP" && strategy[1] === "MAX" && isMaxPlayAction(AIopPlay, strategy[2]))
            action = strategy[3];
        else if (strategy[0] === "OPP" && strategy[1] === "LAST"
            && checkMostLastNTurnAIOppPlay(AIopPlay, parseInt(strategy[2]), strategy[3]))
            action = strategy[4];
        else if (strategy[0] === "OPP" && strategy[1] === "-1"
            && turn - 1 >= 0 && AIopPlay[turn - 1] === strategy[2])
            action = strategy[3];

        if (action !== "") {
            console.error("strategy:", strategy);
            return action;
        }
    }

    return "";
}

const nbturns = parseInt(readline());
console.error("Number of turn", nbturns);
console.error("-------------------------");

var inputs = readline().split(' ');
const n = parseInt(inputs[0]);
const AI1 = inputs[1];
const AI1strategy = [];
let AI1score = 0;
for (let i = 0; i < n; i++) {
    AI1strategy.push(readline().split(" "));
}
console.error("AI1:\n", AI1strategy);
console.error("-------------------------");

var inputs = readline().split(' ');
const m = parseInt(inputs[0]);
const AI2 = inputs[1];
const AI2strategy = []
let AI2score = 0;
for (let i = 0; i < m; i++) {
    AI2strategy.push(readline().split(" "));
}
console.error("AI2:\n", AI2strategy);
console.error("-------------------------");

let AI1plays = [];
let AI2plays = [];
for (let i = 0; i < nbturns; i++) {
    console.error("--> AI1 play");
    let AI1action = selectActionFromStrategy([AI1plays, AI1strategy, AI1score], [AI2plays, AI2score], i);

    console.error("---> AI2 play");
    let AI2action = selectActionFromStrategy([AI2plays, AI2strategy, AI2score], [AI1plays, AI1score], i);
    console.error("-------------------------");

    if (AI1action === "RAND") {
        AI1action = getRandomAction(xList.length - 1);
    }

    if (AI2action === "RAND") {
        AI2action = getRandomAction(xList.length - 1);
    }

    if (AI1action === AI2action) {
        let score = AI1action === "C" ? 2 : 1;

        AI1score += score;
        AI2score += score;
    }
    else if (AI1action === "C") {
        AI2score += 3;
    }
    else {
        AI1score += 3;
    }

    AI1plays.push(AI1action);
    AI2plays.push(AI2action);
}

console.error(AI1plays.join(" "));
console.error(AI2plays.join(" "));
console.error([AI1, AI1score], [AI2, AI2score])
console.error("-------------------------");

if (AI1score === AI2score) {
    console.log("DRAW")
}
else {
    console.log(AI1score > AI2score ? AI1 : AI2);
}