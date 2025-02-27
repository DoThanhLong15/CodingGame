
const ceasarDecode = (letter, shiftKey) => {
    console.error(letter, shiftKey)

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let string = "";

    for(const char of letter) {
        let charIndex = alphabet.indexOf(char);

        string += alphabet[(charIndex - shiftKey + 26) % 26];
    }

    return string;
}

const textToDecode = readline().split(" ");
console.error(textToDecode);

let shiftKeyAccept = -1;
for(let index = 0; index < 26; index++) {
    let letterAvaiable = textToDecode.filter(letter => letter.length === 5);

    if(letterAvaiable.length === 0) {
        break;
    }

    let isHasChief = letterAvaiable.some(letter => ceasarDecode(letter, index) === "CHIEF");

    if(isHasChief) {
        shiftKeyAccept = index;
        break;
    }
}

if(shiftKeyAccept !== -1) {
    let decodeLetters = textToDecode.map(letter => ceasarDecode(letter, shiftKeyAccept));

    console.log(decodeLetters.join(" "));
}
else {
    console.log("WRONG MESSAGE");
}