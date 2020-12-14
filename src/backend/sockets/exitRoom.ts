import GAME_STATE from '@utils/gameState';

function exitRoom() {
  const socket = this;
  const { game } = socket
  if (process.env.NODE_ENV === 'development') {
    console.log(`user disconnected ${socket.id}`);
  }
  if (!game) return;

  const { roomID } = socket.game;
  const passedData = { socketID: socket.id };

  if (game.getState() === GAME_STATE.WAITING) {
    socket.in(roomID).emit('exit player', passedData);
  } else {
    // READY 상태일때 나가면 답이 없음
    socket.in(roomID).emit('game terminated', {})
  }

  game.removeUser({ socketID: socket.id });
}

export default function onWaitingRoom(socket: any) {
  socket.on('disconnect', exitRoom);
}
