import GAME_STATE from '@utils/gameState';
import { PLAYER, CARD } from '@utils/number';
import generateRandom from '@utils/generateRandom';

function isEnterable() {
  if (this.getState() !== GAME_STATE.WAITING || this.users.size >= PLAYER.MAX)
    return false;
  return true;
}

function updateUserProfile({ socketID, nickname, color }) {
  const user = this.getUser(socketID);
  if (color) user.setColor(color);
  if (nickname) user.setNickname(nickname);
}

function startGame() {
  // 플레이어 텔러 순서 정하기, 유저 초기화 하기
  generateRandom.shuffleArray(this.getUsers()).forEach((user, index) => {
    user.initOnStart({ turnID: index });
  });

  // 게임에 사용할 카드 섞어서 세팅하기
  this.status.unusedCards = generateRandom.cards(CARD.DECK);
  // 플레이어에게 5장 나눠주기
  this.dealCards(CARD.HAND - 1);

  // 게임 턴 초기화
  this.turn = 0;
}

function endWaitingScene() {
  if (this.getState() !== GAME_STATE.READY) return;

  this.startGame();
  this.startTellerScene();
}

const methodGroup = {
  isEnterable,
  updateUserProfile,
  startGame,
  endWaitingScene,
};

export default methodGroup;
