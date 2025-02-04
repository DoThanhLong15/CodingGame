const N = parseInt(readline());
const hoursePositions = [];
let minX = Math.pow(2, 31);
let maxX = -minX;

let totalY = 0;

for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const X = parseInt(inputs[0]);
    const Y = parseInt(inputs[1]);

    if (X < minX) {
        minX = X;
    }

    if (X > maxX) {
        maxX = X;
    }

    totalY += Y;

    hoursePositions.push([X, Y]);
}

hoursePositions.sort((a, b) => a[1] - b[1]); 
const medianY = hoursePositions[Math.floor(N / 2)][1];

let answer = maxX - minX;
for (const [, y] of hoursePositions) {
    answer += Math.abs(y - medianY);
}

console.error(medianY)
console.error('x:', [minX, maxX]);
console.error('hourse:', hoursePositions);

console.log(answer);