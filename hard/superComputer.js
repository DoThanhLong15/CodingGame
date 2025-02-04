const N = parseInt(readline());

const calculations = [];

for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const J = parseInt(inputs[0]);
    const D = parseInt(inputs[1]);

    calculations.push({
        start: J,
        end: J + D - 1
    })
}

calculations.sort((calculation1, calculation2) => calculation1.end - calculation2.end);

calculations.forEach(calculation => console.error(calculation.start, calculation.end));
console.error("----------------------");

let lastEnd = -1;
let count = 0;

calculations.forEach(calculation => {
    if(calculation.start > lastEnd) {
        lastEnd = calculation.end;
        count++;

        console.error("-->", calculation.start, calculation.end);
    }
})

console.log(count);