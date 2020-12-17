import logger from '@utils/winston';

function onSendChat({ message }) {
  const socket = this;
  const { game, user } = socket;

  if (!user || !game) return;

  const { nickname } = user.getProfile();
  logger.info(`chat ip:${socket.handshake.address} msg:${message}`);
  socket.in(game.roomID).emit('send chat', { message, nickname });
}

export default function onChat(socket) {
  socket.on('send chat', onSendChat);
}
