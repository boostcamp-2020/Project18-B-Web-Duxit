import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

function onSendGuesserDecision({ cardID }) {
  const socket = this;
  const { game, user } = socket;

  if (!game || !user) return;
  if (game.status.state !== GAME_STATE.GUESSER) return;

  user.submitCard(cardID);
  socket.emit('guesser select card', { cardID });
  socket
    .in(game.roomID)
    .emit('other guesser decision', { playerID: socket.id });
}

export const forceGuesserSelect = ({ unsubmittedUsers, users }) => {
  unsubmittedUsers.forEach((user) => {
    const { socketID } = user;
    const otherUsers = users.filter(
      ({ socketID: guesserID }) => guesserID !== socketID,
    );
    const { cardID } = user.selectCardFromUser({ teller: false });
    emit({ socketID, name: 'guesser select card', params: { cardID } });
    emit({
      users: otherUsers,
      name: 'other guesser decision',
      params: { playerID: socketID },
    });
  });
};

export default function onGuesserSelectCard(socket) {
  socket.on('send guesser decision', onSendGuesserDecision);
}
