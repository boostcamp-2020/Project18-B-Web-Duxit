import GAME_STATE from '@utils/gameState';

function onSendGuesserDecision({ cardID }) {
  const socket = this;
  const { game, user } = socket;

  // Error handling
  if (!game || !user) return;
  if (game.status.state !== GAME_STATE.GUESSER) return;

  // Save cardID into Game.user
  user.submitCard(cardID);

  // Emit socket
  socket.emit('guesser select card', { cardID });
}

export default function onGuesserSelectCard(socket) {
  socket.on('send guesser decision', onSendGuesserDecision);
}
