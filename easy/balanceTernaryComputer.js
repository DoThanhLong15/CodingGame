
const N = parseInt(readline());

console.error(N);

let temp = N;
let string = "";
if (N === 0) {
    string = 0;
}
else {
    while (Math.abs(temp) > 0) {
        let number = temp - Math.floor(temp / 3) * 3;

        console.error(number)

        switch (number) {
            case 0:
                temp = Math.floor(temp / 3);
                string = '0' + string;
                break;
            case 1:
                temp = Math.floor(temp / 3);
                string = '1' + string;
                break;
            case 2:
                string = 'T' + string;
                temp = Math.floor(temp / 3) + 1;
                break;
        }

        console.error(temp, string);
    }
}


console.log(string);