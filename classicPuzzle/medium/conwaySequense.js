
const R = parseInt(readline());
const L = parseInt(readline());

if (L === 1) {
    console.log(R);
}
else if (L === 2) {
    console.log(1, R);
}
else {
    let line = [1, R];
    console.error(line);
    
    for (let i = 3; i <= L; i++) {
        let newLine = [];

        let numberCheck = line.shift();
        let count = 1;
        while(line.length > 0) {
            let number = line.shift();

            if(number === numberCheck) {
                count++;
            }
            else {
                newLine.push(count, numberCheck);
                numberCheck = number;
                count = 1;
            }
        }

        newLine.push(count, numberCheck);
        console.error("-->", newLine);
        console.error("--------------------------", i);

        line = [...newLine];
    }

    console.log(line.join(" "));
}