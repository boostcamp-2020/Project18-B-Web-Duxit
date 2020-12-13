import { PLAYER, CARD, TIME } from '@utils/number';
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
  this.getUsers.forEach((user) => {
    const deck = this.status.unusedCards;
    const newCards = deck.slice(0, count);
    newCards.forEach((card) => user.addCard(card));
    this.status.unusedCards = deck.slice(count);
  });
}

function startRound() {
  this.status.turn += 1;

  const {
    users,
    status: { turn },
  } = this;

  // TODO: teller 순서 섞기
  const teller = [...users.values()][turn % users.size];
  const { socketID: tellerID } = teller;

  users.forEach((user) => {
    this.dealCards();
    const params = { tellerID, endTime: this.endTime };
    user.initOnRound(params);
    emit({ socketID: user.socketID, name: 'get round data', params });
  });
}

const methodGroup = { getState, setState, dealCards, startRound };

export default methodGroup;
