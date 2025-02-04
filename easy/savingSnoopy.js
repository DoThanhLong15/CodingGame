
const splitIntoLines = (text, maxLength = 75) => {
    let result = [];
    let currentLine = '';

    for (let word of text.split(' ')) {
        if ((currentLine + word).length > maxLength) {
            result.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine += word + ' ';
        }
    }

    if (currentLine.trim().length > 0) {
        result.push(currentLine.trim());
    }

    return result;
}

const n = parseInt(readline());
const swap = {};
for (let i = 0; i < n; i++) {
    const [original, newChar] = readline().split(" -> ");

    swap[original] = newChar;
}
const length = parseInt(readline());
const encodedMessage = readline().split("+");

console.error(swap);
console.error(encodedMessage);

let result = "";
let acceptChar = [];
for (let index = 0; index < encodedMessage.length; index++) {
    let char = encodedMessage[index];

    if (char === "*") {
        let preChar = acceptChar.pop();

        result += swap[preChar] ? swap[preChar] : preChar;

        if (result.length === 75) {

        }
    }
    else {
        let charAccept = /^[a-zA-Z0-9.,;:!?'()\- ]$/;

        if (char[0] === '#') {
            let removeCharNumber = parseInt(char.slice(1));

            while (removeCharNumber) {
                acceptChar.pop();
                removeCharNumber--;
            }
        }
        else if (char === "%") {
            let shuffled = [];
    
            for (let i = 0; i < acceptChar.length; i += 2) {
                shuffled.push(acceptChar[i]);
            }
            
            for (let i = 1; i < acceptChar.length; i += 2) {
                shuffled.push(acceptChar[i]);
            }

            acceptChar = shuffled;
        }
        else if (charAccept.test(char)) {
            acceptChar.push(char);
        }
    }
}

console.log(splitIntoLines(result).join("\n"));