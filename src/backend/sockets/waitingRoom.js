import GameList from '@game/GameList';
import { PLAYER } from '@utils/number';
import logger from '@utils/winston';

function onJoinPlayer({ roomID }) {
  const socket = this;
  const game = GameList.getGame(roomID);
  if (!game || !game.isEnterable(roomID)) return;

  const user = game.addUser({ socketID: socket.id, roomID });
  socket.game = game;
  socket.user = user;
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

function onUpdatePlayer(params = {}) {
  const socket = this;
  const {
    user,
    game: { roomID },
  } = socket;
  const { nickname = user.nickname, color = user.color } = params;
  const passedData = { nickname, color, socketID: socket.id };

  socket.game.updateUserProfile(passedData);
  logger.info(`nickname ip:${socket.handshake.address} nickname:${nickname}`);
  socket.in(roomID).emit('update player', passedData);
  socket.emit('update player', passedData);
}

const timeoutMap = new Map();

const isPossibleStartGame = ({ users }) => {
  const isAllReady = [...users].every(([, user]) => user.isReady);
  const isValidSize = users.size >= PLAYER.MIN && users.size <= PLAYER.MAX;
  return isAllReady && isValidSize;
};

function onReadyPlayer({ isReady }) {
  const socket = this;
  const { game } = socket;
  const { users, roomID } = game;
  users.get(socket.id).setReady(isReady);
  socket.in(roomID).emit('ready player', { playerID: socket.id, isReady });

  const validationToStart = isPossibleStartGame({ users });
  if (validationToStart) {
    socket.in(roomID).emit('all ready', {});
    socket.emit('all ready', {});
    const timeout = setTimeout(() => {
      game.start();
      if (timeoutMap.has(game.roomID)) timeoutMap.delete(game.roomID);
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
