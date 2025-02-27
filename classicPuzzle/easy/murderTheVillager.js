const N = parseInt(readline());

const clues = [];
for (let i = 0; i < N; i++) {
    let clueText = readline().replace(/[:,.]/g, '').split(" ");

    let name = clueText[0];
    let place = clueText[5];

    let onPlaceWith = []
    for (let i = 6; i < clueText.length; i++) {
        if (clueText[i] !== "with" && clueText[i] !== "and") {
            onPlaceWith.push(clueText[i]);
        }
    }

    clues.push({
        "name": name,
        "place": place,
        "with": onPlaceWith.join(" "),
        "state": false
    })
}
console.error(clues);
console.error("-------------------------");
let murder = "";
for (let i = 0; i < clues.length; i++) {
    const person = clues[i];
    let count = 0;

    if (murder === "") {
        for (const otherPerson of clues) {
            if (person.name !== otherPerson.name) {
                if (person.place === otherPerson.place && otherPerson.with.includes(person.name)
                    && person.with.includes(otherPerson.name)) {
                    console.error(1, person.name);
                    person.state = true;
                    break;
                }
                else if (otherPerson.with === "alone" && person.with.includes(otherPerson.name)) {
                    console.error("person", person.name);
                    murder = person.name;
                    break;
                }
                else if (person.place !== otherPerson.place){
                    count++;
                }
            }
            else if (person.with === "alone" && otherPerson.with.includes(person.name)) {
                console.error("other", otherPerson.name);
                murder = otherPerson.name;
                break;
            }
        }
        if(count + 1 === clues.length) {
            person.state = true;
        }
    }
}

console.error(clues);
console.error("-------------------------");

if (murder !== "") {
    console.log(murder, "did it!");
}
else {
    let ret = clues.filter(person => !person.state).map(person => person.name);
    if (ret.length > 1) {
        ret = clues.filter(person => !person.state && person.with !== "alone").map(person => person.name);
    }

    console.log(ret.length > 0 ? `${ret[0]} did it!` : 'It was me!');
}