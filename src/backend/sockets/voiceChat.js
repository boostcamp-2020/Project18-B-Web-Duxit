function onConnectVoice() {
  const socket = this;
  const { game } = socket;

  if (!game) return;

  socket.in(game.roomID).emit('another voice connected', socket.id);

  socket.on('disconnect', () => {
    console.log('disconnect event');
    socket.in(game.roomID).emit('voice disconnected', socket.id);
  });
}

function onDisconnectVoice() {
  const socket = this;
  const { game } = socket;

  if (!game) return;

  socket.in(game.roomID).emit('voice disconnected', socket.id);
}

export default function onVoiceChat(socket) {
  socket.on('player connect voice', onConnectVoice);
  socket.on('player disconnect voice', onDisconnectVoice);
}
