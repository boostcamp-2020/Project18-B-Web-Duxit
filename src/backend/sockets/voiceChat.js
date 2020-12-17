function onConnectVoice() {
  const socket = this;
  const { game } = socket;

  if (!game) return;

  socket.in(game.roomID).emit('another voice connected', {
    socketID: socket.id,
  });
}

function onDisconnectVoice() {
  const socket = this;
  const { game } = socket;

  if (!game) return;

  socket.in(game.roomID).emit('voice disconnected', {
    socketID: socket.id,
  });
}

export default function onVoiceChat(socket) {
  socket.on('player connect voice', onConnectVoice);
  socket.on('player disconnect voice', onDisconnectVoice);
}
