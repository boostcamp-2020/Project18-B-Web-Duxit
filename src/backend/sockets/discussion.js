import { TIME } from '@utils/number';

function onSkipPlayer() {
  const socket = this;
  const { user, game } = socket;

  if (!user || !game) return;

  user.setSkip();

  // 모든 유저가 스킵을 눌렀을 경우
  if (game.getUsers().every((u) => u.isSkip)) {
    game.endDiscussionScene();
    socket.in(game.roomID).emit('all skip');
    socket.emit('all skip');
    setTimeout(() => {
      socket.in(game.roomID).emit('end discussion');
      socket.emit('end discussion');
    }, TIME.SKIP_DISCUSSION);
  }
}

export default function onDiscussion(socket) {
  socket.on('skip player', onSkipPlayer);
}
