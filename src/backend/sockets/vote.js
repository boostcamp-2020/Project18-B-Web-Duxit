import GAME_STATE from '@utils/gameState';

function onVoteCard({ cardID }) {
  const socket = this;
  const { game, user } = socket;

  if (!game || !user) return;
  if (game.getState() !== GAME_STATE.VOTE) return;

  user.voteCard(cardID);
}

export default function onVote(socket) {
  socket.on('vote card', onVoteCard);
}
