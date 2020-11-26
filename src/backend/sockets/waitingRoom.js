import Games from '@game/Games';

function onJoinPlayer({ roomID }) {
  const socket = this;
  if (!roomID || !Games.isEnterableRoom(roomID)) return;

  Games.enterUser({ socketID: socket.id, roomID });
  const userInfo = Games.findUserInfo(socket.id);
  socket.join(roomID);
  socket.emit('enter room', {
    ...userInfo,
    roomID,
    players: [],
  });
}

export default function onWaitingRoom(socket) {
  socket.on('join player', onJoinPlayer);
}
