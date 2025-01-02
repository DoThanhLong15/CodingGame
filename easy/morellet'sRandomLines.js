const m2nums = () => readline().split(' ').map(Number);

const [xA, yA, xB, yB] = m2nums();

console.error([xA, yA])
console.error([xB, yB])

const redByMin = (arr) => {
    const min = Math.min(...arr);
    return arr.every(n => n % min === 0) ? arr.map(e => e / min) : arr;
}

const sameSign = (arr) => (arr[0] < 0 ? arr.map(n => -n) : arr);

const filterUnique = (list, value) => {
    for(const listItem of list) {
        if(listItem[0] === value[0] && listItem[1] === value[1] && listItem[2] === value[2]) {
            return list;
        }
    }

    list.push(value);
    return list;
}

const N = parseInt(readline());

let eqs = []
for (let i = 0; i < N; i++) {
    let line = readline().split(' ').map(Number);

    eqs.push(line);
}

eqs = eqs.map(redByMin)
    .map(sameSign)
    .map(equation => equation.toString())
    .map(equation => equation.split(',').map(Number))
    .reduce((list, value) => filterUnique(list, value), []);

let cntA = 0, cntB = 0;
let answer = "NO";

console.error(eqs)

eqs.forEach(([a, b, c]) => {
    
    let aTotal = xA * a + yA * b + c;
    let bTotal = xB * a + yB * b + c;

    if (aTotal === 0 || bTotal === 0) {
        answer = "ON A LINE";
    }
    if (aTotal > 0) {
        cntA++;
    }

    if (bTotal > 0) {
        cntB++;
    }
});
if (answer !== "NO") {
    console.log('ON A LINE');
}
else {
    console.log((cntA % 2) === (cntB % 2) ? 'YES' : 'NO');
}