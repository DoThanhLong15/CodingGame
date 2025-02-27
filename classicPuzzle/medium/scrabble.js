const scrabble_points = {
    'e': 1, 'a': 1, 'i': 1, 'o': 1, 'n': 1, 'r': 1, 't': 1, 'l': 1, 's': 1, 'u': 1,
    'd': 2, 'g': 2,
    'b': 3, 'c': 3, 'm': 3, 'p': 3,
    'f': 4, 'h': 4, 'v': 4, 'w': 4, 'y': 4,
    'k': 5,
    'j': 8, 'x': 8,
    'q': 10, 'z': 10
}

const isAvaiableWord = (word, LETTERS) => {
    let letterCheck = LETTERS;

    for (const char of word) {
        let charUsedIndex = letterCheck.indexOf(char);

        if (charUsedIndex === -1) {
            break;
        }

        letterCheck = letterCheck.substring(0, charUsedIndex) + letterCheck.substring(charUsedIndex + 1);
    }

    return letterCheck.length === (LETTERS.length - word.length);
}

const getTotalScoreOfWord = (word) => {
    let total = 0;

    for (const char of word) {
        total += scrabble_points[char];
    }

    return total;
}

let avaiableWords = [];
const N = parseInt(readline());
for (let i = 0; i < N; i++) {
    avaiableWords.push(readline());
}
const LETTERS = readline();

avaiableWords = avaiableWords.filter(word => isAvaiableWord(word, LETTERS))
console.error(avaiableWords)

let answer = avaiableWords.reduce((chosenWord, word) => {
    if (getTotalScoreOfWord(chosenWord) < getTotalScoreOfWord(word)) {
        return word;
    }

    return chosenWord;
}, "")

console.log(answer);
