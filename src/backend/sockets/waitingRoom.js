import GameList from '@game/GameList';

function onJoinPlayer({ roomID }) {
  const socket = this;
  const game = GameList.getGame(roomID);
  if (!game || !game.isEnterable(roomID)) return;

  socket.game = game;
  const user = game.addUser({ socketID: socket.id, roomID });
  socket.join(roomID);

  socket.emit('enter room', {
    ...user.getProfile(),
    roomID,
    players: game.getUsersProfile(),
  });

  socket
    .in(game.roomID)
    .emit('update player', { ...user.getProfile(), socketID: socket.id });
}

function onUpdatePlayer({ nickname, color }) {
  const socket = this;
  const { roomID } = socket.game;
  const passedData = { nickname, color, socketID: socket.id };

  socket.game.updateUserProfile(passedData);
  socket.in(roomID).emit('update player', passedData);
  socket.emit('update player', passedData);
}

export default function onWaitingRoom(socket) {
  socket.on('join player', onJoinPlayer);
  socket.on('update player', onUpdatePlayer);
}
