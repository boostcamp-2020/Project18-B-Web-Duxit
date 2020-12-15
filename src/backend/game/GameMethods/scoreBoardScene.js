import { PLAYER, CARD, TIME, SCORE } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

const isGameOver = (game) => {
  // 카드가 전부 소진 되었을 경우
  if (game.status.unusedCards.length < game.getUsers().length) return true;

  // 플레이어 최소 한명이 30점을 넘겼을 경우
  if (game.getUsers().some((user) => user.score > SCORE.WIN_SCORE)) return true;

  return false;
};

function startScoreBoardScene() {
  this.setState(GAME_STATE.SCORE);
  this.emitRoundScore();
  setTimeout(() => {
    this.endScoreBoardScene();
  }, TIME.WAIT_SCORE_BOARD);
}

function emitRoundScore() {
  emit({
    users: this.getUsers(),
    name: 'get round score',
    params: {
      round: this.turn,
      isGameOver: isGameOver(this),
    },
  });
}

function endScoreBoardScene() {
  if (this.getState() !== GAME_STATE.SCORE) return;

  if (isGameOver(this)) {
    this.startGameEndScene();
  } else {
    this.startTellerScene();
  }
}

const methodGroup = {
  startScoreBoardScene,
  emitRoundScore,
  endScoreBoardScene,
};

export default methodGroup;
