enum SignalChar {
  FALSE = "_",
  TRUE = "-",
}

type GateType = "AND" | "OR" | "XOR" | "NAND" | "NOR" | "NXOR";
type SignalValue = string;

interface GateValue {
  valueA: boolean;
  valueB: boolean;
}

interface OutputSignal {
  name: string;
  gate: GateType;
  inputNameA: string;
  inputNameB: string;
}

interface SimulationInput {
  inputSignals: Record<string, SignalValue>;
  outputSignals: OutputSignal[];
}

const signalConverter = {
  toBoolean: (signal: SignalValue): boolean => signal === SignalChar.TRUE,

  toChar: (bool: boolean): SignalValue =>
    bool ? SignalChar.TRUE : SignalChar.FALSE,
};

const logicGates = {
  AND: (a: boolean, b: boolean): boolean => a && b,
  OR: (a: boolean, b: boolean): boolean => a || b,
  XOR: (a: boolean, b: boolean): boolean => a !== b,
  NAND: (a: boolean, b: boolean): boolean => !(a && b),
  NOR: (a: boolean, b: boolean): boolean => !(a || b),
  NXOR: (a: boolean, b: boolean): boolean => a === b,
};

function calculateGateOutput(
  gate: GateType,
  valueA: boolean,
  valueB: boolean,
): boolean {
  const gateFunction = logicGates[gate];
  if (!gateFunction) {
    throw new Error(`Unknown gate type: ${gate}`);
  }
  return gateFunction(valueA, valueB);
}

function processSignalBit(
  gate: GateType,
  signalCharA: SignalValue,
  signalCharB: SignalValue,
): SignalValue {
  const valueA = signalConverter.toBoolean(signalCharA);
  const valueB = signalConverter.toBoolean(signalCharB);
  const result = calculateGateOutput(gate, valueA, valueB);
  return signalConverter.toChar(result);
}

function calculateSignal(
  outputSignal: OutputSignal,
  inputSignals: Record<string, SignalValue>,
): string {
  const { name, gate, inputNameA, inputNameB } = outputSignal;
  const signalA = inputSignals[inputNameA];
  const signalB = inputSignals[inputNameB];

  if (!signalA || !signalB) {
    throw new Error(`Input signal not found: ${inputNameA} or ${inputNameB}`);
  }

  const result = signalA
    .split("")
    .map((bitA, index) => processSignalBit(gate, bitA, signalB[index]))
    .join("");

  return `${name} ${result}`;
}

function parseInput(): SimulationInput {
  const numberOfInputSignals = parseInt(readline());
  const numberOfOutputSignals = parseInt(readline());

  const inputSignals: Record<string, SignalValue> = {};
  for (let i = 0; i < numberOfInputSignals; i++) {
    const [name, value] = readline().split(" ");
    inputSignals[name] = value;
  }

  const outputSignals: OutputSignal[] = [];
  for (let i = 0; i < numberOfOutputSignals; i++) {
    const [name, gate, inputNameA, inputNameB] = readline().split(" ");
    outputSignals.push({
      name,
      gate: gate as GateType,
      inputNameA,
      inputNameB,
    });
  }

  return { inputSignals, outputSignals };
}

function debugPrint(input: SimulationInput): void {
  const { inputSignals, outputSignals } = input;

  console.error("=== Input Signals ===");
  Object.entries(inputSignals).forEach(([name, value]) => {
    console.error(`${name}: ${value}`);
  });

  console.error("=== Output Signals ===");
  outputSignals.forEach(({ name, gate, inputNameA, inputNameB }) => {
    console.error(`${name} = ${gate}(${inputNameA}, ${inputNameB})`);
  });
  console.error("====================");
}

function solve(input: SimulationInput): void {
  const { inputSignals, outputSignals } = input;

  outputSignals.forEach((outputSignal) => {
    const result = calculateSignal(outputSignal, inputSignals);
    console.log(result);
  });
}

const input = parseInput();
debugPrint(input);
solve(input);
