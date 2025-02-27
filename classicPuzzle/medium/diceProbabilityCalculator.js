
const rollDice = (value) => {
    let diceValue = [];

    for (let side = 1; side <= value; side++) {
        diceValue.push(side);
    }

    return diceValue;
}

const extractExpression = (expr) => {
    const outputQueue = [];
    const operatorStack = [];

    const precedence = {
        '>': 1,
        '+': 2,
        '-': 2,
        '*': 3
    }

    expr.forEach(token => {
        if (!isNaN(token)) {
            outputQueue.push([parseInt(token)])
        }
        else if (token[0] === 'd') {
            let sides = rollDice(token.slice(1));
            outputQueue.push(sides);
        }
        else if (token === '(') {
            operatorStack.push(token);
        }
        else if (token === ')') {
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== "(") {
                outputQueue.push(operatorStack.pop());
            }

            operatorStack.pop();
        }
        else {
            while (operatorStack.length &&
                precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]) {
                outputQueue.push(operatorStack.pop());
            }

            operatorStack.push(token);
        }
    })

    while (operatorStack.length) {
        outputQueue.push(operatorStack.pop());
    }

    console.error(outputQueue);
    console.error("-------------------------");

    return outputQueue;
}

const calculateExpression = (outputQueue) => {
    const valueStack = [];

    outputQueue.forEach(token => {
        if (Array.isArray(token)) {
            valueStack.push(token);
        }
        else {
            const number2 = valueStack.pop();
            const number1 = valueStack.pop();

            const result = [];
            for (let value1 of number1) {
                for (let value2 of number2) {
                    switch (token) {
                        case '+':
                            result.push(value1 + value2);
                            break;
                        case '-':
                            result.push(value1 - value2);
                            break;
                        case '*':
                            result.push(value1 * value2);
                            break;
                        case '>':
                            result.push(value1 > value2 ? 1 : 0);
                            break;
                    }
                }
            }
            valueStack.push(result);
        }
    })

    return valueStack.pop();
}

const calculateProbability = (valueStack) => {
    const probabilities = {};

    for (const value of valueStack) {
        probabilities[value] = (probabilities[value] || 0) + 1;
    }

    let totalOutcomes = valueStack.length;
    let sortedResults = Object.keys(probabilities).map(Number).sort((a, b) => a - b);

    sortedResults.forEach(result => {
        let probability = (probabilities[result] / totalOutcomes * 100).toFixed(2);
        console.log(`${result} ${probability}`);
    });
}

const expr = readline().match(/d\d+|\d+|[()+\-*>]/g);
console.error(expr.join(""));

const outputQueue = extractExpression(expr);
const valueStack = calculateExpression(outputQueue);
calculateProbability(valueStack);