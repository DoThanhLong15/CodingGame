const parseSurfaceInput = (surfaceNumber) => {
    const surfaces = [];

    while (surfaceNumber--) {
        let inputs = readline().split(' ');
        const landX = parseInt(inputs[0]);
        const landY = parseInt(inputs[1]);

        surfaces.push([landX, landY]);
    }

    return surfaces;
};

const findFlatGround = (surfaceList) => {
    for (let index = 1; index < surfaceList.length; index++) {
        let [preX, preY] = surfaceList[index - 1];
        let [x, y] = surfaceList[index];

        if (preY === y && x - preX >= 1000) {
            return { from: preX, to: x, height: y };
        }
    }

    return null;
};

const getRotation = (lander, zone) => {
    let angleXcomp = 0;
    let angleHScomp = 0;
    let angle = 0;

    if (shouldKeepAltitude(lander, zone) && lander.hs !== 0) {
        angle = 0;
    } else {
        angleXcomp = Math.round(getDistance(lander.x, zone) * (3 / 185));
        angleXcomp += Math.round(angleXcomp / 0.67);

        if (Math.abs(lander.hs) > 7 && lander.y > zone.height + 100) {
            angleHScomp = Math.round(lander.hs * (9 / 24.7));
            angleHScomp += Math.round(angleHScomp / 0.7);
        }

        angle = angleXcomp + angleHScomp;
        angle = Math.max(-90, Math.min(90, angle));
    }
    
    return angle;
};

const getPower = (lander, zone) => {
    let pow = 0;
    let HScomp = 0;
    let VScomp = 0;

    if (shouldKeepAltitude(lander, zone) && lander.vs < -1) {
        pow = 4;
    } else {
        if ((lander.angle < 0 && lander.hs < 0) || (lander.angle > 0 && lander.hs > 0)) {
            HScomp = Math.abs(Math.round(lander.hs / 15));
        }
        VScomp = -Math.round(lander.vs / 6.6);
        pow = Math.min(HScomp + VScomp, 4);
    }

    if (getDistance(lander.x, zone) === 0 && lander.angle === 0 && (lander.y - zone.height) < 123 && lander.vs > -30) {
        pow = 0;
    }

    return pow;
};

const shouldKeepAltitude = (lander, zone) => {
    return (lander.y - zone.height) < 600 && getDistance(lander.x, zone) > 1200;
};

const getDistance = (x, zone) => {
    if (x < zone.from) return x - zone.from;
    if (x > zone.to) return x - zone.to;
    return 0;
};

const surfaceNumber = parseInt(readline());
const surfaces = parseSurfaceInput(surfaceNumber);
const flatGround = findFlatGround(surfaces);

while (true) {
    const inputs = readline().split(' ');
    const lander = {
        x: parseInt(inputs[0]),
        y: parseInt(inputs[1]),
        hs: parseInt(inputs[2]),
        vs: parseInt(inputs[3]), 
        fuel: parseInt(inputs[4]),
        angle: parseInt(inputs[5]),
        thrust: parseInt(inputs[6])
    };

    const myR = getRotation(lander, flatGround);
    const myP = getPower(lander, flatGround);

    console.log(`${myR} ${myP}`);
}