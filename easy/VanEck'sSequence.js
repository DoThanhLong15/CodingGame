
const A1 = parseInt(readline());
const N = parseInt(readline());

console.error(A1);
console.error(N);

const numberList = [A1, 0];
const numberLastIndex = {}
numberLastIndex[A1] = 0;

console.error(numberLastIndex, numberList)
console.error("-------------------------------");

for(let index = 2; index < N; index++) {
    let preValue = numberList[index - 1];
    let lastIndexPreValue = numberLastIndex[preValue];

    if(lastIndexPreValue !== undefined) {
        numberList.push(index - lastIndexPreValue - 1);
    }
    else {
        numberList.push(0);
    }

    numberLastIndex[preValue] = index - 1;
}

console.log(numberList[N - 1]);
