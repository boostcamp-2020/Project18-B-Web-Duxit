function exitRoom() {
  const socket = this;
  socket.game?.removeUser({ socketID: socket.id });
  console.log(`user disconnected ${socket.id}`);
}

export default function onWaitingRoom(socket) {
  socket.on('disconnect', exitRoom);
}
