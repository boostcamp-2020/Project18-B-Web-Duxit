import GameList from '@game/GameList';
import GAME_STATE from '@utils/gameState';
import { PLAYER, TIME } from '@utils/number';
import logger from '@utils/winston';

// 유저가 게임 페이지에 접속했을 때 처음으로 호출하는 함수
function onJoinPlayer({ roomID }) {
  const socket = this;
  const game = GameList.getGame(roomID);
  if (!game || !game.isEnterable(roomID)) return;

  // 유저 정보를 Game.users에 저장
  const user = game.addUser({ socketID: socket.id, roomID });
  // 나중에 코드를 작성하기 쉽게 game과 user를 socket에 저장
  socket.game = game;
  socket.user = user;
  socket.join(roomID);

  // 이미 접속해 있는 다른 플레이어들의 정보를 전송
  socket.emit('enter room', {
    ...user.getProfile(),
    roomID,
    players: game.getUsersProfile(),
  });

  // 이미 접속해 있는 다른 플레이어들에게 지금 새로 들어온 유저 정보 전송
  socket
    .in(game.roomID)
    .emit('update player', { ...user.getProfile(), socketID: socket.id });
}

// 플레이어가 오리색이나 닉네임을 바꿨을 때
function onUpdatePlayer(updatedUserProfile = {}) {
  const socket = this;
  const { game } = socket;
  const { nickname, color } = updatedUserProfile;

  const userProfile = { nickname, color, socketID: socket.id };
  game.updateUserProfile(userProfile);

  // Record Log
  logger.info(`nickname ip:${socket.handshake.address} nickname:${nickname}`);
  // Send updated user profile to players
  socket.in(game.roomID).emit('update player', userProfile);
  socket.emit('update player', userProfile);
}

const timeoutMap = new Map();

const isPossibleStartGame = ({ users }) => {
  const isAllReady = [...users].every(([, user]) => user.isReady);
  const isValidSize = users.size >= PLAYER.MIN && users.size <= PLAYER.MAX;
  return isAllReady && isValidSize;
};

const deleteGameStartTimeout = (roomID) => {
  const timeout = timeoutMap.get(roomID);
  clearTimeout(timeout);
  timeoutMap.delete(roomID);
  return true;
};

// 사용자가 레디를 눌렀을 때 or 레디를 풀었을 때
function onReadyChange({ isReady }) {
  const socket = this;
  const { game } = socket;
  const { users, roomID } = game;

  // 플레이어의 레디 상태를 변경
  users.get(socket.id).setReady(isReady);
  socket.in(roomID).emit('ready player', { playerID: socket.id, isReady });

  const validationToStart = isPossibleStartGame({ users });
  // 모든 플레이어가 레디 상태일 때
  if (validationToStart) {
    // 모든 플레이어에게 전부 준비 상태임을 알림
    socket.in(roomID).emit('all ready', {});
    socket.emit('all ready', {});

    // 게임 시작을 위한 타이머 설정
    const timeout = setTimeout(() => {
      game.endWaitingScene();
      if (timeoutMap.has(game.roomID)) timeoutMap.delete(game.roomID);
    }, TIME.WAIT_GAME_START);
    timeoutMap.set(roomID, timeout);
    game.setState(GAME_STATE.READY);
  }
  // 한명이라도 레디 하지 않은 경우, 이미 레디 상태였는지 확인
  else if (game.getState() === GAME_STATE.READY) {
    deleteGameStartTimeout(roomID);
    // 실제로 타이머가 중지 되었을 경우 플레이어들에게 알림
    socket.in(roomID).emit('game start aborted', {});
    socket.emit('game start aborted', {});
  }
}

export default function onWaitingRoom(socket) {
  socket.on('join player', onJoinPlayer);
  socket.on('update player', onUpdatePlayer);
  socket.on('ready player', onReadyChange);
}
