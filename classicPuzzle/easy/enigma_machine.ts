const ALPHABET: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ALPHABET_LENGTH: number = ALPHABET.length;
const NUMBER_OF_ROTORS: number = 3;

enum Operation {
  ENCODE = "ENCODE",
  DECODE = "DECODE",
}

interface EnigmaInput {
  operation: Operation;
  shiftValue: number;
  rotors: string[];
  message: string;
}

function readInput(): EnigmaInput {
  const operation = readline() as Operation;
  const shiftValue = parseInt(readline());

  const rotors: string[] = [];
  for (let i = 0; i < NUMBER_OF_ROTORS; i++) {
    rotors.push(readline());
  }

  const message = readline();

  return { operation, shiftValue, rotors, message };
}

function displayInput(input: EnigmaInput): void {
  const { operation, shiftValue, rotors, message } = input;

  console.error("Operation:", operation);
  console.error("Shift Value:", shiftValue);
  rotors.forEach((rotor, index) => {
    console.error(`Rotor ${index + 1}: ${rotor}`);
  });
  console.error("Message:", message);
  console.error("==============================");
}

function applyCaesarShift(message: string, shiftValue: number): string {
  let result = "";
  const shiftDirection = shiftValue >= 0 ? 1: -1;

  for (let i = 0; i < message.length; i++) {
    const charIndex = ALPHABET.indexOf(message[i]);
    const shiftedIndex = (charIndex + shiftValue + i * shiftDirection) % ALPHABET_LENGTH;
    const normalizedIndex = (shiftedIndex + ALPHABET_LENGTH) % ALPHABET_LENGTH;

    result += ALPHABET[normalizedIndex];
  }

  return result;
}

function applyRotor(message: string, rotor: string): string {
  let result = "";

  for (const char of message) {
    const alphabetIndex = ALPHABET.indexOf(char);
    result += rotor[alphabetIndex];
  }

  return result;
}

function reverseRotor(message: string, rotor: string): string {
  let result = "";

  for (const char of message) {
    const rotorIndex = rotor.indexOf(char);
    result += ALPHABET[rotorIndex];
  }

  return result;
}

function encodeMessage(input: EnigmaInput): string {
  const { shiftValue, rotors, message } = input;

  let encoded = applyCaesarShift(message, shiftValue);
  console.error("After Caesar shift:", encoded);

  encoded = rotors.reduce((currentMessage, rotor, index) => {
    const transformed = applyRotor(currentMessage, rotor);
    console.error(`After rotor ${index + 1}:`, transformed);
    return transformed;
  }, encoded);

  return encoded;
}

function decodeMessage(input: EnigmaInput): string {
  const { shiftValue, rotors, message } = input;

  let decoded = message;

  for (let i = NUMBER_OF_ROTORS - 1; i >= 0; i--) {
    decoded = reverseRotor(decoded, rotors[i]);
    console.error(`After rotor ${i + 1}:`, decoded);
  }

  decoded = applyCaesarShift(decoded, -shiftValue);
  console.error("After Caesar shift:", decoded);

  return decoded;
}

function solve(input: EnigmaInput): void {
  const output =
    input.operation === Operation.ENCODE
      ? encodeMessage(input)
      : decodeMessage(input);

  console.log(output);
}

const input = readInput();
displayInput(input);
solve(input);
