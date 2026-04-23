const EARTH_RADIUS_KM = 6371;
const DEGREES_TO_RADIANS = Math.PI / 180;

const DEFIBRILLATOR_PARSE_INDICES = {
    id: 0,
    name: 1,
    address: 2,
    phone: 3,
    longitude: 4,
    latitude: 5
} as const;

interface Position {
    longitude: number;
    latitude: number;
}

interface Defibrillator {
    id: number;
    name: string;
    address: string;
    phone: string;
    position: Position;
    distance: number;
}

interface ProcessingResult {
    userPosition: Position;
    closestDefibrillator: Defibrillator;
    allDefibrillators: Defibrillator[];
}

function parsePosition(longitude: string, latitude: string): Position {
    return {
        longitude: parseInputNumber(longitude),
        latitude: parseInputNumber(latitude)
    };
}

function parseDefibrillatorData(csvLine: string, userPosition: Position): Defibrillator {
    const fields = csvLine.split(";");
    const position = parsePosition(
        fields[DEFIBRILLATOR_PARSE_INDICES.longitude],
        fields[DEFIBRILLATOR_PARSE_INDICES.latitude]
    );

    return {
        id: Number(fields[DEFIBRILLATOR_PARSE_INDICES.id]),
        name: fields[DEFIBRILLATOR_PARSE_INDICES.name],
        address: fields[DEFIBRILLATOR_PARSE_INDICES.address],
        phone: fields[DEFIBRILLATOR_PARSE_INDICES.phone],
        position,
        distance: calculateDistance(userPosition, position)
    };
}

function parseInputNumber(input: string): number {
    return Number(input.replace(',', '.'));
}

function convertDegreesToRadians(degrees: number): number {
    return degrees * DEGREES_TO_RADIANS;
}

function calculateDistance(positionA: Position, positionB: Position): number {
    const longitudeDifference = (positionB.longitude - positionA.longitude) 
        * cosDegrees((positionA.latitude + positionB.latitude) / 2);
    const latitudeDifference = positionB.latitude - positionA.latitude;

    const distanceSquared = longitudeDifference * longitudeDifference 
        + latitudeDifference * latitudeDifference;

    return Math.sqrt(distanceSquared) * EARTH_RADIUS_KM;
}

function cosDegrees(degrees: number): number {
    return Math.cos(convertDegreesToRadians(degrees));
}

function loadDefibrillators(userPosition: Position, count: number): Defibrillator[] {
    const defibrillators: Defibrillator[] = [];
    
    for (let i = 0; i < count; i++) {
        const defibrillator = parseDefibrillatorData(readline(), userPosition);
        defibrillators.push(defibrillator);
    }
    
    return defibrillators;
}

function findClosestDefibrillator(defibrillators: Defibrillator[]): Defibrillator {
    return defibrillators.reduce((closest, current) => 
        current.distance < closest.distance ? current : closest
    );
}

function processInput(): ProcessingResult {
    const userPosition = parsePosition(readline(), readline());
    const defibrillatorCount = parseInt(readline());
    
    const allDefibrillators = loadDefibrillators(userPosition, defibrillatorCount);
    const closestDefibrillator = findClosestDefibrillator(allDefibrillators);

    return {
        userPosition,
        closestDefibrillator,
        allDefibrillators
    };
}

function logDebugInfo(result: ProcessingResult): void {
    console.error("User position:", result.userPosition.longitude, result.userPosition.latitude);
    console.error("Defibrillator list:");
    
    result.allDefibrillators.forEach(defibrillator => {
        console.error(defibrillator.id, defibrillator.name, defibrillator.distance);
    });
    
    console.error("===========================");
}

function outputClosestDefibrillator(defibrillator: Defibrillator): void {
    console.error("The closest defibrillator:");
    console.log(defibrillator.name);
}

const result = processInput();
logDebugInfo(result);
outputClosestDefibrillator(result.closestDefibrillator);