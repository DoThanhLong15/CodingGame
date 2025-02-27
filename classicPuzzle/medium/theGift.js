
const parcipantNumber = parseInt(readline());
const giftPrice = parseInt(readline());

const budgetList = [];
let totalBudget = 0;
for (let i = 0; i < parcipantNumber; i++) {
    const budget = parseInt(readline());

    budgetList.push(budget);
    totalBudget += budget;
}

console.error("Gift:", giftPrice);
console.error("Budget:", budgetList.join(" "));
console.error("-----------------------");

if (totalBudget < giftPrice) {
    console.log("IMPOSSIBLE");
}
else {
    budgetList.sort((budget1, budget2) => budget1 - budget2);

    const contributions = new Array(parcipantNumber).fill(0);
    let totalCost = giftPrice;
    let budgetNumberRemain = parcipantNumber;

    for (let i = 0; i < parcipantNumber; i++) {
        const moneyNeed = Math.floor(totalCost / budgetNumberRemain);
        budgetNumberRemain--;

        let contribution = Math.min(budgetList[i], moneyNeed);

        contributions[i] = contribution;
        totalCost -= contribution;

        if (totalCost === 0) break;
    }

    contributions.sort((a, b) => a - b).forEach(value => console.log(value));
}