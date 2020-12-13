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
  const tellerTurnID = this.status.turn % users.size;
  users.forEach((user) => {
    if (tellerTurnID === user.TurnID) user.setTeller(true);
    else user.setTeller(false);
  });

  this.dealCards();
  const params = {
    tellerID: this.getTeller().socketID,
    endTime: this.endTime,
  };

  emit({ users, name: 'get round data', params });

  users.forEach((user) => {
    user.initOnRound();
  });
}

const methodGroup = { getState, setState, dealCards, startRound };

export default methodGroup;
