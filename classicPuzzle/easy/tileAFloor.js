/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const N = parseInt(readline());

const pattern = [];

const handleLeftSideCharPattern = (char) => {
    const charList = [['(', ')'], ['{', '}'], ['[', ']'], ['<', '>']]

    for(const [left, right] of charList) {
        if(char === left || char === right) {
            return char === left ? right: left;
        }
    }

    return char;
}

const handleTopSideCharPattern = (char) => {
    const charList = [['^', 'v'], ['A', 'V'], ['W', 'M'], ['w', 'm'], ['u', 'n']]

    for(const [top, bottom] of charList) {
        if(char === top || char === bottom) {
            return char === top ? bottom: top;
        }
    }

    return char;
}

for (let i = 0; i < N; i++) {
    pattern.push(readline().split(""));
}
pattern.forEach(row => console.error(row.join("")))

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - 1; j++) {
        let char = pattern[i][N - j - 2];

        if (char === "/" || char === "\\") {
            char = char === "/" ? "\\": "/";
        }
        else {
            char = handleLeftSideCharPattern(char);
        }        

        pattern[i].push(char);
    }
}
pattern.forEach(row => console.error(row.join("")))

for (let i = 0; i < N - 1; i++) {
    let temp = [];

    for (let j = 0; j < N * 2 - 1; j++) {
        let char = pattern[N - i - 2][j];

        if (char === "/" || char === "\\") {
            char = char === "/" ? "\\": "/";
        }
        else {
            char = handleTopSideCharPattern(char);
        }   

        temp.push(char);
    }

    pattern.push(temp);
}
pattern.forEach(row => console.error(row.join("")))

let count = 2;
while (count > 0) {
    console.log("+" + "-".repeat(N * 2 - 1) + "+" + "-".repeat(N * 2 - 1) + "+");

    for (let row of pattern) {
        console.log("|" + row.join("") + "|" + row.join("") + "|");
    }

    count--;
}

console.log("+" + "-".repeat(N * 2 - 1) + "+" + "-".repeat(N * 2 - 1) + "+");