/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const T = readline().split(" ");

// console.error(T)

let output = [];
for(let string of T) {
    console.error(string)

    if(Number.isInteger(parseInt(string[0]))) {
        let numberString = '';
        let char = '';
        for(let i = 0; i < string.length; i++) {
            if(!Number.isInteger(parseInt(string[i]))) {
                char = string.substring(i);
                break;
            }

            numberString += string[i];
        }

        if(char === '') {
            char = numberString[numberString.length - 1];
            numberString = numberString.slice(0, numberString.length - 1)
        }

        numberString = parseInt(numberString);

        if(char === "bS") {
            char = "\\";
        }
        else if (char === "sp") {
            char = " ";
        }
        else if (char === "sQ") {
            char = "'";
        }
        
        output.push(char.repeat(numberString));

        // console.error(char)
        // console.error(output)
    }
    else {
        output.push("\n");
    }
}

console.error("-----------------")
console.log(output.join(""));