import GameList from '@game/GameList';

function onJoinPlayer({ roomID }) {
  const socket = this;
  const game = GameList.getGame(roomID);
  if (!game || !game.isEnterable(roomID)) return;

  // User enter the room
  socket.game = game;
  const user = game.addUser({ socketID: socket.id, roomID });
  socket.join(roomID);
  // only sending to the client
  socket.emit('enter room', {
    ...user.getProfile(),
    roomID,
    players: game.getOtherUsersProfile(socket.id),
  });

  // TODO send 'update player' to other players in the room
}

export default function onWaitingRoom(socket) {
  socket.on('join player', onJoinPlayer);
}
