const isGoodNumber = (number) => {
    for (let e = 1; e <= Math.sqrt(number); e++) {

        const k = 2 + 1 / e + e;
        let p = Math.round(number / k);

        if (p > e && 2 * p + p / e + p * e === number) {
            console.error(p, e)

            return "YES";
        }
    }

    return "NO";
}

const N = parseInt(readline());
for (let i = 0; i < N; i++) {
    const X = parseInt(readline());

    console.log(isGoodNumber(X));
}