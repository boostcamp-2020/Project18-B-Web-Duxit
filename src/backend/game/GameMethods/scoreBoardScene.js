import { TIME, SCORE } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

const isGameOver = (game) => {
  // 카드가 전부 소진 되었을 경우
  if (game.status.unusedCards.length < game.getUsers().length) return true;

  // 플레이어 최소 한명이 30점을 넘겼을 경우
  const bHigherGoal = game
    .getUsers()
    .some((user) => user.score >= SCORE.WIN_SCORE);
  return bHigherGoal;
};

// 가장 높은 스코어를 가진 유저의 socketID를 리턴
const getWinner = (users) => {
  // 가장 높은 스코어를 찾음
  const highestScore = Math.max(...users.map((user) => user.score));

  // 가장 높은 스코어를 가진 플레이어들를 찾음
  const winUsers = users.filter((user) => user.score === highestScore);

  // 어레이가 아닌 하나의 플레이어만 보내줌 (공동 우승 없음)
  return winUsers[0];
};

function startScoreBoardScene() {
  this.setState(GAME_STATE.SCORE);

  setTimeout(() => {
    this.endScoreBoardScene();
  }, TIME.WAIT_SCORE_BOARD);
}

function emitGameEnd() {
  const users = this.getUsers();
  emit({
    users,
    name: 'game end',
    params: {
      winnerID: getWinner(users).socketID,
    },
  });
}

function endScoreBoardScene() {
  if (this.getState() !== GAME_STATE.SCORE) return;

  if (isGameOver(this)) {
    this.emitGameEnd();
    this.setState(GAME_STATE.WAITING);
  } else {
    this.startTellerScene();
  }
}

const methodGroup = {
  startScoreBoardScene,
  emitGameEnd,
  endScoreBoardScene,
};

export default methodGroup;
