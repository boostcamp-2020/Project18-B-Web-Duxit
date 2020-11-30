function onSendChat({ message }) {
  const socket = this;
  // game = socket.game
  const { game } = socket;
  const { nickname } = game.getUser(socket.id).getProfile();
  socket.in(game.roomID).emit('send chat', { message, nickname });
}

export default function onChat(socket) {
  socket.on('send chat', onSendChat);
}
