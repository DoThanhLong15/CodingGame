
var inputs = readline().split(' ');
const r = parseInt(inputs[0]);
const c = parseInt(inputs[1]);

const pixelMatrix = [];
for (let i = 0; i < r; i++) {
    pixelMatrix.push(readline().split(' '));
}

var inputs = readline().split(' ');
const m = parseInt(inputs[0]);
const n = parseInt(inputs[1]);

const kernelMatrix = []
for (let i = 0; i < m; i++) {
    kernelMatrix.push(readline().split(' '));
}

pixelMatrix.forEach(row => console.error(row.join(" ")));
console.error("---------------------------");

kernelMatrix.forEach(row => console.error(row.join(" ")));
console.error("---------------------------");

const imageMatrix = [];
for(let row = 0; row < r - m + 1; row++) {
    const rowResult = [];
    for(let col = 0; col < c - n + 1; col++) {
        let sum = 0;
        for(let rowK = 0; rowK < m; rowK++) {
            for(let colK = 0; colK < n; colK++) {
                sum += kernelMatrix[rowK][colK] * pixelMatrix[row + rowK][col + colK];
            }
        }
        rowResult.push(sum);
    }
    imageMatrix.push(rowResult);
}

imageMatrix.forEach(row => console.log(row.join(" ")));