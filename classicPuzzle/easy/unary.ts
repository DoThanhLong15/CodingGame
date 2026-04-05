interface MessageInfo {
    text: string;
    binary: string;
}

interface BitRun {
    bit: number;
    length: number;
}

const BITS_PER_CHAR = 7;
const ZERO = "0";

function convertMessageToBinary(text: string): MessageInfo {
    const binary = text
        .split("")
        .map(convertCharToBinary)
        .join("");

    return { text, binary };
}

function convertCharToBinary(char: string): string {
    const binary = char.charCodeAt(0).toString(2);
    return binary.padStart(BITS_PER_CHAR, ZERO);
}

function logInput(info: MessageInfo): void {
    console.error("---------- INPUT ----------");
    console.error("Message:", info.text);
    console.error("Binary :", info.binary);
    console.error("---------------------------");
}

function encodeBitRun(run: BitRun): string {
    const prefix = run.bit === 0 ? "00" : "0";
    return `${prefix} ${ZERO.repeat(run.length)}`;
}

function getBitRuns(binary: string): BitRun[] {
    const bits = binary.split("").map(Number);

    const runs: BitRun[] = [];
    let currentBit = bits[0];
    let count = 1;

    for (let i = 1; i < bits.length; i++) {
        if (bits[i] === currentBit) {
            count++;
        } else {
            runs.push({ bit: currentBit, length: count });
            currentBit = bits[i];
            count = 1;
        }
    }

    runs.push({ bit: currentBit, length: count });

    return runs;
}

function encodeBinary(binary: string): string {
    return getBitRuns(binary)
        .map(encodeBitRun)
        .join(" ");
}

const input = readline();
const messageInfo = convertMessageToBinary(input);

logInput(messageInfo);

console.log(encodeBinary(messageInfo.binary));