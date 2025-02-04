const numberTree = new Set();

const N = parseInt(readline());
for (let i = 0; i < N; i++) {
    const telephoneNumbers = readline();

    for (let index = 0; index < telephoneNumbers.length; index++) {
        let numberValue = telephoneNumbers[index];
        let preNumberValue = index > 0 ? telephoneNumbers.substring(0, index) : undefined;

        numberTree.add(`${numberValue}-${preNumberValue}`)
    }
}

console.error(numberTree);

console.log(numberTree.size);