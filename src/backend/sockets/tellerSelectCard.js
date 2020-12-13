import GAME_STATE from '@utils/gameState';

function onSendTellerDecision({ cardID, topic }) {
  const socket = this;
  const { game, user } = socket;

  if (!game || !user) return;
  if (game.status.state !== GAME_STATE.TELLER) return;
  if (!cardID || !topic) return;

  game.status.topic = topic;
  user.submitCard(cardID);
  game.endTellerScene();
}

function onSendTellerPicking({ cardID }) {
  const socket = this;
  const { game, user } = socket;

  if (!game || !user) return;
  if (game.status.state !== GAME_STATE.TELLER) return;

  const cardPosition = user.cards.findIndex(
    (userCardID) => userCardID === cardID,
  );
  socket.in(game.roomID).emit('get teller picking', { cardPosition });
}

export default function onTellerSelectCard(socket) {
  socket.on('send teller decision', onSendTellerDecision);
  socket.on('send teller picking', onSendTellerPicking);
}
