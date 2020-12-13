import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import generateRandom from '@utils/generateRandom';
import { emit } from '@socket';
import TOPIC from '@utils/cardTopic.json';

function startTellerScene() {
  this.setState(GAME_STATE.TELLER);
  this.startRound();
  setTimeout(this.endTellerScene, TIME.WAIT_TELLER_SELECT);
}

function forceTellerSelect() {
  if (this.getState() !== GAME_STATE.TELLER) return;

  const teller = this.getTeller();
  teller.forceSubmitCard();
  this.status.topic = TOPIC[teller.submittedCard];
}

function emitTellerDecision() {
  emit({
    users: this.getGuessers(),
    name: 'teller decision',
    params: { topic: this.status.topic, endTime: this.endTime },
  });

  const teller = this.getTeller();
  emit({
    socketID: teller.socketID,
    name: 'teller select card',
    params: {
      cardID: teller.submittedCard,
      topic: this.status.topic,
      endTime: this.endTime,
    },
  });
}

function endTellerScene() {
  this.setEndTime(TIME.WAIT_GUESSER_SELECT);
  this.forceTellerSelect();
  this.emitTellerDecision();
  this.startGuesserScene();
}

const methodGroup = {
  startTellerScene,
  forceTellerSelect,
  emitTellerDecision,
  endTellerScene,
};

export default methodGroup;
