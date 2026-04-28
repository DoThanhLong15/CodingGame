const ISBN_10_LENGTH = 10;
const ISBN_10_MODULUS = 11;
const ISBN_13_LENGTH = 13;
const ISBN_13_MODULUS = 10;

interface Input {
  numberOfISBNs: number;
  isbnList: string[];
}

interface ValidationResult {
  count: number;
  list: string[];
}

function parseInput(): Input {
  const numberOfISBNs = parseInt(readline());
  const isbnList: string[] = [];

  for (let i = 0; i < numberOfISBNs; i++) {
    isbnList.push(readline().trim());
  }

  return { numberOfISBNs, isbnList };
}

function isValidISBN(isbn: string): boolean {
  const length = isbn.length;

  switch (length) {
    case ISBN_10_LENGTH:
      return isValidISBN10(isbn);
    case ISBN_13_LENGTH:
      return isValidISBN13(isbn);
    default:
      return false;
  }
}

function isValidISBN10(isbn: string): boolean {
  if (!/^\d{9}[\dX]$/.test(isbn)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < ISBN_10_LENGTH - 1; i++) {
    sum += parseInt(isbn[i]) * (ISBN_10_LENGTH - i);
  }

  const lastDigit =
    isbn[ISBN_10_LENGTH - 1] === "X" ? 10 : parseInt(isbn[ISBN_10_LENGTH - 1]);
  const checkDigit =
    (ISBN_10_MODULUS - (sum % ISBN_10_MODULUS)) % ISBN_10_MODULUS;

  return checkDigit === lastDigit;
}

function isValidISBN13(isbn: string): boolean {
  if (!/^\d{13}$/.test(isbn)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < ISBN_13_LENGTH - 1; i++) {
    const weight = i % 2 === 0 ? 1 : 3;
    sum += parseInt(isbn[i]) * weight;
  }

  const lastDigit = parseInt(isbn[ISBN_13_LENGTH - 1]);
  const checkDigit =
    (ISBN_13_MODULUS - (sum % ISBN_13_MODULUS)) % ISBN_13_MODULUS;

  return checkDigit === lastDigit;
}

function validateISBNs(isbnList: string[]): ValidationResult {
  const invalidISBNs = isbnList.filter((isbn) => !isValidISBN(isbn));

  return {
    count: invalidISBNs.length,
    list: invalidISBNs,
  };
}

function printResult(result: ValidationResult): void {
  console.log(`${result.count} invalid:`);
  result.list.forEach((isbn) => console.log(isbn));
}

const input = parseInput();
const result = validateISBNs(input.isbnList);
printResult(result);
