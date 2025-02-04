const n = parseInt(readline());
const numberList = [];

for (let i = 0; i < n; i++) {
    numberList.push(parseInt(readline()));
}

console.error(numberList.join(" "));
console.error("-----------------------------");

function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}

let temp = [];
for (const num of numberList) {
    const pos = binarySearch(temp, num);

    if (pos < temp.length) {
        temp[pos] = num;
    } else {
        temp.push(num);
    }
    console.error(temp.join(" "));
    console.error("-----------------------------");
}

console.log(temp.length);