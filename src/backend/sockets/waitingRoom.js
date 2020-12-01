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
    players: [],
  });

  // TODO send 'update player' to other players in the room
}

const timeoutMap = new Map();

function onReadyPlayer({ isReady }) {
  const socket = this;
  const { game } = socket;

  game.users.get(socket.id).toggleReady(isReady);
  socket.in(game.roomID).emit('ready player', { playerID: socket.id, isReady });

  const isAllReady = [...game.users].every(([, user]) => user.isReady);
  const isValidSize = game.users.size >= 3 && game.users.size <= 6;

  if (isAllReady && isValidSize) {
    socket.in(game.roomID).emit('all ready', {});
    socket.emit('all ready', {});
    const timeout = setTimeout(() => {
      // 5 seconds later
      // TODO: game start하면서 스토리텔러라던가 그런거 넘겨줘야되나??
      socket.in(game.roomID).emit('game start', {});
      socket.emit('game start', {});
      // TODO: 유저들의 turn 정하기
      // game.startGame()
      if (timeoutMap.has(game.roomID)) timeoutMap.delete(game.roomID);
    }, 5000);
    timeoutMap.set(game.roomID, timeout);
  } else if (timeoutMap.has(game.roomID)) {
    socket.in(game.roomID).emit('game start aborted', {});
    socket.emit('game start aborted', {});
    const timeout = timeoutMap.get(game.roomID);
    clearTimeout(timeout);
    timeoutMap.delete(game.roomID);
  }
}

export default function onWaitingRoom(socket) {
  socket.on('join player', onJoinPlayer);
  socket.on('ready player', onReadyPlayer);
}
