
const L = parseInt(readline());
const N = parseInt(readline());

const rodList = [];

for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const length = parseInt(inputs[0]);
    const value = parseInt(inputs[1]);

    rodList.push({
        value, length
    })
}

console.error(L)
console.error(rodList)

let sums = new Array(L + 1).fill(0);
for (let { value, length } of rodList) {

    for (let curL = 1; curL <= L; curL++) {
        let resL = curL - length;
        
        if (resL >= 0) {
            sums[curL] = Math.max(sums[curL], sums[resL] + value);
            console.error("-->", sums[curL])
        }
    }
}

console.error(sums);
console.log(sums[L]);