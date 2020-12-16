function onConnectVoice(id) {
  const socket = this;
  const { game } = socket;

  if (!game) return;

  socket.in(game.roomID).emit('another voice connected', id);

  socket.on('disconnect', () => {
    socket.in(game.roomID).emit('voice disconnected', id);
  });
}

function onDisconnectVoice(id) {
  const socket = this;
  const { game } = socket;

  if (!game) return;

  socket.in(game.roomID).emit('voice disconnected', id);
}

export default function onVoiceChat(socket) {
  socket.on('player connect voice', onConnectVoice);
  socket.on('player disconnect voice', onDisconnectVoice);
}
