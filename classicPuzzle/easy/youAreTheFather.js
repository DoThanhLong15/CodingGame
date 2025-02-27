
const mother = readline().replace(/\s+/g, ' ').split(" ");
mother.shift();
mother.shift();

const child = readline().replace(/\s+/g, ' ').split(" ");
child.shift();
child.shift();

const numOfPossibleFathers = parseInt(readline())

console.error("mother:", mother);
console.error("child:", child);
console.error("------------------------");

let fatherName = "";
let fatherList = [];
for (let i = 0; i < numOfPossibleFathers; i++) {
    const father = readline().replace(/\s+/g, ' ').split(" ");

    let name = father.shift().slice(0, -1);
    console.error(father.join(" "))

    let count = 0;
    let startIndex = 0;

    while (startIndex < child.length) {
        let dadChrom1 = father[startIndex][0];
        let dadChrom2 = father[startIndex][1];

        let childChrom1 = child[startIndex][0];
        let childChrom2 = child[startIndex][1];

        if (dadChrom1 !== childChrom1 && dadChrom1 !== childChrom2
            && dadChrom2 !== childChrom1 && dadChrom2 !== childChrom2) {
            break;
        }

        count++;
        startIndex++;
    }

    if(count === child.length) {
        fatherName = name;
        break;
    }
}

fatherList.forEach(father => console.error(father, "\n------------------------"));

console.log(`${fatherName}, you are the father!`);
