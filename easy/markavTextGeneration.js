let random_seed = 0;
const pick_option_index = (num_of_options) => {
    random_seed += 7;
    return random_seed % num_of_options;
}

const t = readline().split(" ");
const d = parseInt(readline());
const l = parseInt(readline());
const seed = readline().split(" ");

console.error("text:", t);
console.error("depth:", d);
console.error("length:", l);
console.error("seed:", seed);

const dictionary = {};

for (let i = 0; i < t.length - d; i++) {
    let string = t[i];
    for (let j = i + 1; j < i + d; j++) {
        string += " " + t[j];
    }

    if (dictionary[string]) {
        if (dictionary[string].filter(letter => letter === t[i + d]).length === 0) {
            dictionary[string].push(t[i + d]);
        }
    }
    else {
        dictionary[string] = [t[i + d]];
    }
}

console.error("-----------------------");
console.error(dictionary)

while (seed.length < l) {
    let text = seed[seed.length - d];

    for (let i = seed.length - d + 1; i < seed.length; i++) {
        text += " " + seed[i];
    }

    console.error("-----------------------");
    console.error(text, dictionary[text]);

    let index = pick_option_index(dictionary[text].length);
    seed.push(dictionary[text][index]);

    console.error(index);
    console.error("seed:", seed)
}

console.error("-----------------------");
console.log(seed.join(" "));