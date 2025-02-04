
const n = parseInt(readline());
var inputs = readline().split(' ');

const profit = [];
for (let i = 0; i < n; i++) {
    profit.push(parseInt(inputs[i]));
}
console.error(profit);

let maxLoss = 0;
let valueBeforeLoss = profit[0];
for(let index = 1; index < n; index++) {
    let value = profit[index];
    let preValue = profit[index - 1];

    if(value > preValue && value > valueBeforeLoss) {
        valueBeforeLoss = value;
    }
    else {
        maxLoss = maxLoss > valueBeforeLoss - value ? maxLoss: valueBeforeLoss - value;
    }
}

console.log(maxLoss === 0 ? 0: -maxLoss);
