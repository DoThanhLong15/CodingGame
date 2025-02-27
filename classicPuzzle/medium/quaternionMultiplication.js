const formatExpression = (expression) => {
    const newExpression = {
        'i': 0,
        'j': 0,
        'k': 0,
        'z': 0,
    }

    let tempNumber = "";
    let symbol = '+';

    for (let char of expression) {
        if (char === "-" || char === "+") {
            symbol = char;
            continue;
        }
        else if (char !== "i" && char !== "j" && char !== "k") {
            tempNumber += char;
            continue;
        }

        let number = tempNumber === "" ? 1 : parseInt(tempNumber);
        newExpression[char] = symbol === '+' ? number : -number;

        tempNumber = "";
        symbol = '+';
    }

    if (tempNumber.length > 0) {
        let number = parseInt(tempNumber);
        newExpression.z = symbol === '+' ? number : -number;
    }

    return newExpression;
}

const multiplyExpression = (expr1, expr2) => {
    const i = expr1.j * expr2.k - expr1.k * expr2.j + expr1.i * expr2.z + expr1.z * expr2.i;
    const k = expr1.i * expr2.j - expr1.j * expr2.i + expr1.k * expr2.z + expr1.z * expr2.k;
    const j = expr1.k * expr2.i - expr1.i * expr2.k + expr1.j * expr2.z + expr1.z * expr2.j;
    const z = - (expr1.i * expr2.i) - (expr1.j * expr2.j) - (expr1.k * expr2.k) + expr1.z * expr2.z;

    return {
        i, j, k, z
    }
}

const handleNumber = (number, char, result) => {
    let string = "";

    if (number !== 0) {
        if (result.length === 0) {
            string += number === -1 ? "-" : "";
        }
        else {
            string += number > 0 ? "+" : (number === -1 ? "-" : "");
        }

        if (Math.abs(number) !== 1) {
            string += number;
        }

        if (char !== 'z') {
            string += char;
        }
    }

    return string;
}

const showOutput = (expr) => {
    let result = "";
    result += handleNumber(expr.i, 'i', result);
    result += handleNumber(expr.j, 'j', result);
    result += handleNumber(expr.k, 'k', result);
    result += handleNumber(expr.z, 'z', result);

    console.log(result);
}

let tempExpresstion = "";
const expressionList = [];

const expr = readline().split('');
while (expr.length > 0) {
    let char = expr.shift();

    if (char === ')') {
        expressionList.push(formatExpression(tempExpresstion));
        tempExpresstion = "";
    }
    else if (char !== '(') {
        tempExpresstion += char;
    }
}

expressionList.forEach(expr => console.error(expr));
console.error("---------------------");

while (expressionList.length > 1) {
    const expr1 = expressionList.shift();
    const expr2 = expressionList.shift();

    expressionList.unshift(multiplyExpression(expr1, expr2));
}

showOutput(expressionList.pop());