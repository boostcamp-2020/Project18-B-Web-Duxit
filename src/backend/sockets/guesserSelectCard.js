import GAME_STATE from '@utils/gameState';
import { TIME } from '@utils/number';
import generateRandom from '@utils/generateRandom';
import { emit } from '@socket';

const emitGetAllDecisions = ({ users }) => {
  const submittedCardIDs = users.map((user) => user.submittedCard);
  const suffledCardIDs = generateRandom.suffleArray(submittedCardIDs);
  emit({ users, name: 'get all decisions', params: { cards: suffledCardIDs } });
};

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

  const users = game.getUsers();
  const submittedUsers = users.filter(
    ({ submittedCard }) => submittedCard !== null,
  );

  if (submittedUsers.length === users.length) {
    game.setState(GAME_STATE.DISCUSSION);
    setTimeout(() => {
      emitGetAllDecisions({ users });
    }, TIME.DELAY_GET_ALL_DECISIONS);
  }
}

export const forceGuesserSelect = ({ unsubmittedUsers, users, endTime }) => {
  unsubmittedUsers.forEach((user) => {
    const { socketID } = user;
    const otherUsers = users.filter(
      ({ socketID: guesserID }) => guesserID !== socketID,
    );
    const { cardID } = user.forceSubmitCard({ teller: false });
    emit({
      socketID,
      name: 'guesser select card',
      params: { cardID, endTime },
    });
    emit({
      users: otherUsers,
      name: 'other guesser decision',
      params: { playerID: socketID, endTime },
    });
  });

  setTimeout(() => {
    emitGetAllDecisions({ users });
  }, TIME.DELAY_GET_ALL_DECISIONS);
};

export default function onGuesserSelectCard(socket) {
  socket.on('send guesser decision', onSendGuesserDecision);
}
