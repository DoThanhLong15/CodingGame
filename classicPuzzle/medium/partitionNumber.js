const T = parseInt(readline());

for (let i = 0; i < T; i++) {
    const n = parseInt(readline());

    const numberCase = new Array(n + 1).fill(0)
    numberCase[0] = 1;

    for (let value = 1; value <= n; value++) {
        for(let remain = value; remain <= n; remain++) {

            numberCase[remain] += numberCase[remain - value];
        }
    }

    console.log(numberCase[n]);
}