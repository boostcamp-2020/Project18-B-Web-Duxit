import GameList from '@game/GameList';
import { PLAYER } from '@utils/number';

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

const timeoutMap = new Map();

function onReadyPlayer({ isReady }) {
  const socket = this;
  const { game } = socket;
  const { users, roomID } = game;
  users.get(socket.id).toggleReady(isReady);
  socket.in(roomID).emit('ready player', { playerID: socket.id, isReady });

  const isAllReady = [...users].every(([, user]) => user.isReady);
  const isValidSize = users.size >= PLAYER.MIN && users.size <= PLAYER.MAX;
  if (isAllReady && isValidSize) {
    socket.in(roomID).emit('all ready', {});
    socket.emit('all ready', {});
    const timeout = setTimeout(() => {
      socket.in(roomID).emit('game start', {});
      socket.emit('game start', {});

      const whoIsTellerInfo = game.startNewRound();
      socket.in(roomID).emit('get round data', { ...whoIsTellerInfo });
      socket.emit('get round data', { ...whoIsTellerInfo });
      if (timeoutMap.has(roomID)) timeoutMap.delete(roomID);
    }, 5000);
    timeoutMap.set(roomID, timeout);
  } else if (timeoutMap.has(roomID)) {
    socket.in(roomID).emit('game start aborted', {});
    socket.emit('game start aborted', {});
    const timeout = timeoutMap.get(roomID);
    clearTimeout(timeout);
    timeoutMap.delete(roomID);
  }
}

export default function onWaitingRoom(socket) {
  socket.on('join player', onJoinPlayer);
  socket.on('update player', onUpdatePlayer);
  socket.on('ready player', onReadyPlayer);
}
