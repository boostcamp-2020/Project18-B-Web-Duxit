function exitRoom() {
  const socket = this;
  if (process.env.NODE_ENV === 'development') {
    console.log(`user disconnected ${socket.id}`);
  }
  if (!socket.game) return;
  const { roomID } = socket.game;
  const passedData = { socketID: socket.id };
  socket.in(roomID).emit('exit player', passedData);

  socket.game?.removeUser({ socketID: socket.id });
}

export default function onWaitingRoom(socket) {
  socket.on('disconnect', exitRoom);
}
