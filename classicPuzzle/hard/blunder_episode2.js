const isPreviousRoom = (room, checkRoomId) => {
    return room.door.some(nextRoomId => nextRoomId === checkRoomId);
}

const maxMoneyGetFromPreRoom = (preRoomList, moneyGet) => {
    const moneyList = [];

    preRoomList.forEach(room => {
        moneyList.push(moneyGet[room.id]);
    })

    return Math.max(...moneyList);
}

const N = parseInt(readline());

const buildingMap = [];
for (let i = 0; i < N; i++) {
    const room = readline().split(' ');

    const roomNumber = parseInt(room[0]);
    const roomMoney = parseInt(room[1]);
    const firstDoor = room[2] === 'E' ? -1: parseInt(room[2]);
    const secondDoor = room[3] === 'E' ? -1: parseInt(room[3]);

    buildingMap.push({
        id: roomNumber,
        money: roomMoney,
        door: [firstDoor, secondDoor]
    })
}

buildingMap.forEach(room => console.error(room));
console.error("-----------------------------");

const moneyGet = new Array(N).fill(0);
moneyGet[0] = buildingMap[0].money;

const roomIdStack = [...buildingMap[0].door];

while(roomIdStack.length > 0) {
    const roomId = roomIdStack.shift();

    if(roomId !== -1) {
        buildingMap[roomId].door.forEach(nextRoomId => {
            if(nextRoomId !== -1 && !roomIdStack.find(roomId => roomId === nextRoomId)) {
                roomIdStack.push(nextRoomId);
            }
        })

        const preRoomList = buildingMap.filter(room => isPreviousRoom(room, roomId));
        moneyGet[roomId] = maxMoneyGetFromPreRoom(preRoomList, moneyGet) + buildingMap[roomId].money;
    }
}

console.error(moneyGet.join(" "));
console.log(Math.max(...moneyGet));