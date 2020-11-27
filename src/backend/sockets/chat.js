import Games from '@game/Games';

export const onSendChat = (socket, { message }) => {
  const roomID = Games.findRoomID(socket.id);
  if (!roomID) return;

  const { nickname } = Games.findUserInfo(socket.id);
  socket.in(roomID).emit('send chat', { message, nickname });
};
