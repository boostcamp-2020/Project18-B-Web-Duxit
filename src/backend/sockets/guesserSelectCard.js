import GAME_STATE from '@utils/gameState';

const isAllSubmitted = (game) => {
  const users = game.getUsers();
  const submittedUsers = users.filter(
    ({ submittedCard }) => submittedCard !== null,
  );

  return submittedUsers.length === users.length;
};

function onSendGuesserDecision({ cardID }) {
  const socket = this;
  const { game, user } = socket;

  if (!game || !user) return;
  if (game.getState() !== GAME_STATE.GUESSER) return;

  user.submitCard(cardID);
  game.emitGuesserSubmit(user);

  if (isAllSubmitted(game)) {
    game.endGuesserScene();
  }
}

export default function onGuesserSelectCard(socket) {
  socket.on('send guesser decision', onSendGuesserDecision);
}
