const c = parseInt(readline());
const p = parseInt(readline());

console.error("number of clothing:", c);
console.error("number of customer:", p);
console.error("---------------------------");

let clothingList = []
for (let i = 0; i < c; i++) {
    const item = readline().split(" ");
    clothingList.push({
        "category": item[0],
        "size": item[1],
        "price": item[2]
    })
}
console.error(clothingList);
console.error("---------------------------");

const customerList = []
for (let i = 0; i < p; i++) {
    const order = readline().split(" ");
    console.error("custom:", order);

    let price = clothingList.filter(clothing => 
        clothing.category == order[0] && clothing.size == order[1]
    ).reduce((min, clothing) => 
        clothing.price < min ? clothing.price: min, 100000);

    console.error("price:", price);
    if(price === 100000) {
        price = "NONE";
    }
    else {
        clothingList = clothingList.filter(clothing => 
            clothing.category !== order[0] || 
            clothing.size !== order[1] || 
            clothing.price !== price
        );

        console.error(clothingList)
    }
    customerList.push(price);
    console.error("---------------------------");
}

customerList.forEach(price => {
    console.log(price);
})