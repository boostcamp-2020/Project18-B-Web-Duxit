import GAME_STATE from '@utils/gameState';
import { TIME } from '@utils/number';
import { emit } from '@socket';

function onSendTellerDecision({ cardID, topic }) {
  const socket = this;
  const { game, user } = socket;

  if (!game || !user) return;
  if (game.status.state !== GAME_STATE.TELLER) return;
  if (!cardID || !topic) return;

  user.submitCard(cardID);
  game.endTellerScene();

  // game.startGuesserSelect(topic);
}

function onSendTellerPicking({ cardID }) {
  const socket = this;
  const { game, user } = socket;
  const cardPosition = user.cards.findIndex(
    (userCardID) => userCardID === cardID,
  );
  socket.in(game.roomID).emit('get teller picking', { cardPosition });
}

export const forceTellerSelect = ({ teller, users, endTime }) => {
  const { cardID, topic } = teller.forceSubmitCard({ teller: true });
  users.forEach((user) => {
    const { socketID } = user;
    const isTeller = socketID === teller.socketID;
    const name = isTeller ? 'teller select card' : 'teller decision';
    const params = isTeller ? { cardID, topic, endTime } : { cardID, endTime };
    emit({ socketID, name, params });
  });
  return topic;
};

export default function onTellerSelectCard(socket) {
  socket.on('send teller decision', onSendTellerDecision);
  socket.on('send teller picking', onSendTellerPicking);
}
