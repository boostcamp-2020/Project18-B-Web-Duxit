import { emit } from '@socket';
import { TIME } from '@utils/number';

function getState() {
  return this.status.state;
}

function setState(state) {
  if (!state) {
    console.error(`Set State, but ${state}`);
    return;
  }
  this.status.state = state;
}

function getEndTime(timeUnit) {
  const currentTime = new Date().getTime();
  return new Date(currentTime + timeUnit);
}

function dealCards(count = 1) {
  this.getUsers().forEach((user) => {
    const deck = this.status.unusedCards;
    const newCards = deck.slice(0, count);
    newCards.forEach((card) => user.addCard(card));
    this.status.unusedCards = deck.slice(count);
  });
}

const setUserTeller = (users, tellerTurnID) => {
  users.forEach((user) => user.setTeller(tellerTurnID === user.turnID));
};

function startRound() {
  const users = this.getUsers();

  this.status.turn += 1;
  const tellerTurnID = this.status.turn % users.length;
  setUserTeller(users, tellerTurnID);

  this.topic = '';

  this.dealCards();

  users.forEach((user) => {
    emit({
      socketID: user.socketID,
      name: 'get round data',
      params: {
        tellerID: this.getTeller().socketID,
        cards: user.cards,
        endTime: this.getEndTime(TIME.WAIT_TELLER_SELECT),
      },
    });
    user.initOnRound();
  });
}

const methodGroup = { getState, setState, getEndTime, dealCards, startRound };

export default methodGroup;
