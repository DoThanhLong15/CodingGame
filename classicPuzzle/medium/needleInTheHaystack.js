const findSubString = (charSet, startChar, endChar) => {
    const startIndex = charSet.indexOf(startChar);
    const endIndex = charSet.indexOf(endChar);

    return charSet.slice(startIndex, endIndex + 1);
};

const findCharInclude = (caseLine) => {
    const charSet = "abcdefghijklmnopqrstuvwxyz";
    const numberSet = "0123456789";

    const charInclude = caseLine.split(",").flatMap(char => {
        if (char.includes('-')) {
            const [startChar, endChar] = char.split("-");

            const subString = charSet.includes(startChar)
                ? findSubString(charSet, startChar, endChar)
                : findSubString(numberSet, startChar, endChar);

            return subString.split("");
        }

        return char;
    });

    return new Set(charInclude);
}

const findShortestStringIndexd = (caseLine, string) => {
    const charInclude = findCharInclude(caseLine);

    let startIndex = 0;
    let endIndex = 0;

    let shortestStart = 0;
    let shortestEnd = string.length;

    let collectChar = new Set();

    while (endIndex < string.length) {
        let char = string[endIndex];

        if (charInclude.has(char)) {
            collectChar.add(char);

            while (startIndex < endIndex
                && string.slice(startIndex + 1, endIndex + 1).indexOf(string[startIndex]) !== -1) {
                startIndex++;
            }
        }
        else {
            startIndex = endIndex + 1;
            collectChar = new Set();
        }

        if (collectChar.size === charInclude.size && (endIndex - startIndex) < (shortestEnd - shortestStart)) {
            shortestStart = startIndex;
            shortestEnd = endIndex;
        }

        endIndex++;
    }

    if (shortestEnd - shortestStart === string.length) {
        startIndex = 0;
        endIndex = 0;
        collectChar = new Set();

        while (endIndex < string.length) {
            let char = string[endIndex];

            if (charInclude.has(char)) {
                collectChar.add(char);

                while (startIndex < endIndex
                    && (string.slice(startIndex + 1, endIndex + 1).indexOf(string[startIndex]) !== -1
                        || !charInclude.has(string[startIndex]))) {
                    startIndex++;
                }
            }

            // console.error(startIndex, endIndex);

            if (collectChar.size === charInclude.size && (endIndex - startIndex) < (shortestEnd - shortestStart)) {
                shortestStart = startIndex;
                shortestEnd = endIndex;
            }

            endIndex++;
        }
    }

    // console.error(charInclude);
    // console.error(shortestStart, shortestEnd);
    // console.error("-----------------------");

    console.log(shortestStart, shortestEnd);
}

const findShortestStringIndex = (caseLine, string) => {
    const charInclude = findCharInclude(caseLine);
    let startIndex = 0, endIndex = 0;
    let shortestStart = 0, shortestEnd = string.length;
    let collectChar = new Map();

    while (endIndex < string.length) {
        const char = string[endIndex];

        if (charInclude.has(char)) {
            collectChar.set(char, (collectChar.get(char) || 0) + 1);
        }

        while (collectChar.size === charInclude.size) {
            if ((endIndex - startIndex) < (shortestEnd - shortestStart)) {
                shortestStart = startIndex;
                shortestEnd = endIndex;
            }

            const startChar = string[startIndex];
            if (charInclude.has(startChar)) {
                collectChar.set(startChar, collectChar.get(startChar) - 1);

                if (collectChar.get(startChar) === 0) {
                    collectChar.delete(startChar);
                }
            }

            startIndex++;
        }

        endIndex++;
    }

    console.log(shortestStart, shortestEnd);
}


const inputs = readline().split(' ');
const w = parseInt(inputs[0]);
const h = parseInt(inputs[1]);

let line = "";
for (let i = 0; i < h; i++) {
    line += readline();
}
console.error(line);
console.error("-----------------------");

const n = parseInt(readline());
for (let i = 0; i < n; i++) {
    findShortestStringIndex(readline(), line);
}