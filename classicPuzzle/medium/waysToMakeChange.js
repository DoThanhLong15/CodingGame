
const N = parseInt(readline());
const S = parseInt(readline());
var inputs = readline().split(' ');

const coins = [];
for (let i = 0; i < S; i++) {
    coins.push(parseInt(inputs[i]));
}

coins.sort((a, b) => a - b);

console.error("target:", N);
console.error(coins.join(" "));
console.error("--------------------------");

const dp = new Array(N + 1).fill(0);
dp[0] = 1;

for (let coin of coins) {
    for (let amount = coin; amount <= N; amount++) {
        dp[amount] += dp[amount - coin];
    }
}

console.log(dp[N]);