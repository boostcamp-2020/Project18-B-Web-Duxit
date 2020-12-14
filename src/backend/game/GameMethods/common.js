import { emit } from '@socket';

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

function dealCards(count = 1) {
  this.getUsers().forEach((user) => {
    const deck = this.status.unusedCards;
    const newCards = deck.slice(0, count);
    newCards.forEach((card) => user.addCard(card));
    this.status.unusedCards = deck.slice(count);
  });
}

function startRound() {
  const users = this.getUsers();

  this.status.turn += 1;
  const tellerTurnID = this.status.turn % users.length;
  users.forEach((user) => {
    if (tellerTurnID === user.turnID) user.setTeller(true);
    else user.setTeller(false);
  });

  this.dealCards();
  const baseParams = {
    tellerID: this.getTeller().socketID,
    endTime: this.endTime,
  };

  users.forEach((user) => {
    emit({
      socketID: user.socketID,
      name: 'get round data',
      params: { ...baseParams, cards: user.cards },
    });
    user.initOnRound();
  });
}

const methodGroup = { getState, setState, dealCards, startRound };

export default methodGroup;
