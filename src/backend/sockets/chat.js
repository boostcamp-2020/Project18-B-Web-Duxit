import Games from '@game/Games';

function onSendChat({ message }) {
  const socket = this;
  const roomID = Games.findRoomID(socket.id);
  if (!roomID) return;

  const { nickname } = Games.findUserInfo(socket.id);
  socket.in(roomID).emit('send chat', { message, nickname });
}

export default function onChat(socket) {
  socket.on('send chat', onSendChat);
}
