const N = parseInt(readline());
let strengths = []
for (let i = 0; i < N; i++) {
    strengths.push(parseInt(readline()));
}

const maxStrengh = strengths.reduce((prev, cur) => prev > cur ? prev : cur, 0)
const lowestDiff = strengths.sort((a, b) => a - b).reduce((prev,cur, i) =>{
    if (!strengths[i + 1]) {
        return prev
    }
    const diff = Math.abs(cur - strengths[i + 1]);
    console.error(cur, strengths[i + 1], diff, prev)
    return diff < prev ? diff : prev
}, maxStrengh)

console.log(lowestDiff)