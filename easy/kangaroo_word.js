const N = parseInt(readline());

const kangarooWords = [];

const isJoeyWord = (kangaroo, joey) => {
    let remaining = kangaroo;
    for (const char of joey) {
        const charIndex = remaining.indexOf(char);
        if (charIndex === -1) return false;
        remaining = remaining.slice(charIndex + 1); 
    }
    return true;
}

for (let i = 0; i < N; i++) {
    const words = readline().split(', ');
    console.error("Processing group:", words);

    for (const candidate of words) {
        const joeyWords = words
            .filter(word => word !== candidate)
            .filter(word => word.length <= candidate.length)
            .filter(word => isJoeyWord(candidate, word))
            .sort();

        if (joeyWords.length > 0) {
            kangarooWords.push(`${candidate}: ${joeyWords.join(", ")}`);
        }
    }
}

if (kangarooWords.length > 0) {
    console.log(kangarooWords.sort().join("\n"));
} else {
    console.log("NONE");
}
