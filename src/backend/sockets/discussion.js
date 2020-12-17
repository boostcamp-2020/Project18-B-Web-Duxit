function onSkipPlayer() {
  const socket = this;
  const { user, game } = socket;

  if (!user || !game) return;

  user.setSkip();
  if (game.getUsers().every((u) => u.bSkip)) game.endDiscussionScene(true);
}

export default function onDiscussion(socket) {
  socket.on('skip player', onSkipPlayer);
}
