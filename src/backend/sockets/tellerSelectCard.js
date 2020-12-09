import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

function onSendTellerDecision({ cardID, topic }) {
  const socket = this;
  const { game, user } = socket;

  if (!game || !user) return;
  if (game.status.state !== GAME_STATE.TELLER) return;
  if (!cardID || !topic) return;

  user.submitCard(cardID);
  game.updateTopic(topic);
  socket.emit('teller select card', { cardID, topic });
  socket.in(game.roomID).emit('teller decision', { topic });
  game.updateState(GAME_STATE.GUESSER);
}

export const forceTellerSelect = ({ teller, users }) => {
  const { cardID, topic } = teller.selectCardFromUser({ teller: true });
  users.forEach((user) => {
    const { socketID } = user;
    const isTeller = socketID === teller.socketID;
    const name = isTeller ? 'teller select card' : 'teller decision';
    const params = isTeller ? { cardID, topic } : { cardID };
    emit({ socketID, name, params });
  });
  return topic;
};

export default function onTellerSelectCard(socket) {
  socket.on('send teller decision', onSendTellerDecision);
}
