const fs = require("fs");

/**
 * @param {string} input
 * @returns {[char[]]}
 */
const parseInput = (input) => {
  const lines = input.split(/\n/);
  const testCaseCount = lines.shift();

  /** @type {[char[]]} */
  const testCases = lines
    .splice(0, testCaseCount)
    .map((line) => line.split(""));

  return testCases;
};

/**
 * @param {char} container
 * @param {char} lastContainerInStock
 * @returns {boolean}
 */
const canStoreInStock = (container, lastContainerInStock) =>
  container.charCodeAt(0) <= lastContainerInStock.charCodeAt(0);

/**
 * @param {char} container
 * @param {[char[]]} stockList
 * @returns {number}
 */
const findAvailableStockIndex = (container, stockList) => {
  if (stockList[0].length === 0) return 0;

  for (let i = 0; i < stockList.length; i++) {
    const stock = stockList[i];
    const lastContainer = stock[stock.length - 1];
    if (canStoreInStock(container, lastContainer)) {
      return i;
    }
  }

  return -1;
};

/**
 * @param {string} testCases
 * @returns {number}
 */
const solveTestCase = (testCase) => {
  /** @type {[char[]]} */
  const stockList = [[]];

  for (const container of testCase) {
    /** @type {number} */
    const availableIndex = findAvailableStockIndex(container, stockList);

    if (availableIndex !== -1) {
      stockList[availableIndex].push(container);
    } else {
      stockList.push([container]);
    }
  }

  return stockList.length;
};

const testCases = parseInput(fs.readFileSync(0).toString());

const testCasesAnswer = testCases.map((testCase) => solveTestCase(testCase));

console.log(testCasesAnswer.join("\n"));