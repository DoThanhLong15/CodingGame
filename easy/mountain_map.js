const n = parseInt(readline()); // the number of mountains

const heights = [];
var inputs = readline().split(' ');
for (let i = 0; i < n; i++) {
    heights.push(parseInt(inputs[i]));
}

console.error(heights);
const maxHeight = Math.max(...heights);
let index = 0;

console.error(maxHeight);

const mountains = []

heights.forEach(height => {

    for (let i = 0; i < height; i++) {
        const line = " ".repeat(maxHeight - i - 1) + "/" + " ".repeat(i);
        mountains.push(line);
    }

    for (let i = height - 1; i >= 0; i--) {
        const line = " ".repeat(maxHeight - i - 1) + "\\" + " ".repeat(i);
        mountains.push(line);
    }
});

const result = Array.from({ length: maxHeight }, (_, rowIndex) => {
    return mountains.map(line => line[rowIndex] || " ").join("").trimEnd();
});

console.log(result.join("\n"));