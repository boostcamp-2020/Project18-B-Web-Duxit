function onSkipPlayer() {
  const socket = this;
  const { user, game } = socket;

  if (!user || !game) return;

  user.setSkip();

  // 모든 유저가 스킵을 눌렀을 경우
  if (game.getUsers().every((u) => u.isSkip)) {
    game.endDiscussionScene(true);
  }
}

export default function onDiscussion(socket) {
  socket.on('skip player', onSkipPlayer);
}
