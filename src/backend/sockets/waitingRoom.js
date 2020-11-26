import Games from '@game/Games';

export const onJoinPlayer = (socket, { roomID }) => {
  if (!roomID || !Games.isEnterableRoom(roomID)) return;

  Games.enterUser({ socketID: socket.id, roomID });
  const userInfo = Games.findUserInfo(socket.id);
  socket.join(roomID);
  socket.emit('enter room', {
    ...userInfo,
    roomID,
    players: [],
  });
};
