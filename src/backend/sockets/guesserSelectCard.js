import GAME_STATE from '@utils/gameState';

function onSendGuesserDecision({ cardID }) {
  const socket = this;
  const { game, user } = socket;

  if (!game || !user) return;
  if (game.status.state !== GAME_STATE.GUESSER) return;

  user.submitCard(cardID);
  socket.emit('guesser select card', { cardID });
  socket.in(game.roomID).emit('guesser select card', { cardID });
}

export default function onGuesserSelectCard(socket) {
  socket.on('send guesser decision', onSendGuesserDecision);
}
