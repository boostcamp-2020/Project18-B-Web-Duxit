import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
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

function startRound() {
  this.status.turn += 1;

  const {
    users,
    status: { unusedCards, turn },
  } = this;

  const isFirstTurn = turn === 1;
  const teller = [...users.values()][turn % users.size];
  const { socketID: tellerID } = teller;
  const requiredCardCount = isFirstTurn ? CARD.HAND : 1;
  const outOfDeck = unusedCards.length < users.size * requiredCardCount;
  if (outOfDeck) return;

  users.forEach((user) => {
    const cards = this.dealCards(user.cards, requiredCardCount);
    const params = { tellerID, cards, endTime: this.endTime };
    user.initOnRound(params);
    emit({ socketID: user.socketID, name: 'get round data', params });
  });
}

const methodGroup = { getState, setState, startRound };

export default methodGroup;
