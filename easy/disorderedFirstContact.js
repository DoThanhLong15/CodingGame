
const encodeString = (string) => {
    let orginalString = string.split("");
    let encodeString = [];

    let charNumber = 1;

    while (orginalString.length > 0) {
        if (charNumber % 2 === 0) {
            encodeString.unshift(...orginalString.splice(0, charNumber));
        }
        else {
            encodeString.push(...orginalString.splice(0, charNumber));
        }

        charNumber++;
    }

    return encodeString.join("");
}

const findNumberCutString = (length) => {
    let result = [1];
    let charNumber = 1;
    let cutStringLength = 1;

    while (cutStringLength < length) {
        charNumber++;
        cutStringLength += charNumber;
        result.push(cutStringLength > length ? charNumber - (cutStringLength - length) : charNumber);
    }

    return result;
}

const decodeString = (string) => {
    const numberCutString = findNumberCutString(string.length);
    let stepIndex = numberCutString.length - 1;

    let encodeString = string.split('');
    let originalString = [];

    while (stepIndex >= 0) {
        if (stepIndex % 2 !== 0) {
            originalString.unshift(...encodeString.splice(0, numberCutString[stepIndex]));
        }
        else {
            originalString.unshift(...encodeString.splice(-numberCutString[stepIndex]));
        }
        stepIndex--;
    }
    return originalString.join('');
}

const N = parseInt(readline());
const MESSAGE = readline();

console.error(N);
console.error(MESSAGE);
console.error("-----------------------");

let turn = 1;
let answer = MESSAGE;

if (N > 0) {    
    while(turn <= N) {
        answer = decodeString(answer);
        turn++;
    }
}
else {
    while(turn <= -N) {
        answer = encodeString(answer);
        turn++;
    }
}

console.log(answer);