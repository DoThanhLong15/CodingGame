const complexities = [
    { name: "O(1)", func: (n) => 1 },
    { name: "O(log n)", func: (n) => Math.log(n) },
    { name: "O(n)", func: (n) => n },
    { name: "O(n log n)", func: (n) => n * Math.log(n) },
    { name: "O(n^2)", func: (n) => n ** 2 },
    { name: "O(n^2 log n)", func: (n) => n * n * Math.log(n) },
    { name: "O(n^3)", func: (n) => n ** 2.1 }, // submit error for O(n^3)
    { name: "O(2^n)", func: (n) => 2 ** n },
];

const N = parseInt(readline());
const data = [];

for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const num = parseInt(inputs[0]);
    const t = parseInt(inputs[1]);

    data.push({ num, t });
}

const normalizedVariance = (ratios) => {
    const meanRatios = ratios.reduce((a, b) => a + b, 0) / ratios.length;
    const variance = ratios.reduce((sum, r) => sum + (r - meanRatios) ** 2, 0) / ratios.length;
    return variance / (meanRatios ** 2);
}

let x = data.map(({ num }) => num);
let y = data.map(({ t }) => t);

let bestFit = complexities
    .map(({ name, func }) => {
        let ratios = data.map(({ num, t }) => t / func(num));
        return { name, error: normalizedVariance(ratios) };
    })
    .sort((a, b) => a.error - b.error);

console.error(bestFit);

console.log(bestFit[0].name);