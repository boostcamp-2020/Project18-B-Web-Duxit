import { TIME } from '@utils/number';

const isPossibleSkipDiscussion = ({ users }) => {
  const isAllSkip = [...users].every(([, user]) => user.isSkip);
  return isAllSkip;
};

function onSkipPlayer() {
  const socket = this;
  const { game } = socket;
  const { users, roomID } = game;
  users.get(socket.id).setSkip();

  const validationToSkipDiscussion = isPossibleSkipDiscussion({ users });
  if (validationToSkipDiscussion) {
    socket.in(roomID).emit('all skip');
    socket.emit('all skip');
    setTimeout(() => {
      socket.in(roomID).emit('end discussion');
      socket.emit('end discussion');
    }, TIME.SKIP_DISCUSSION);
  }
}

export default function onDiscussion(socket) {
  socket.on('skip player', onSkipPlayer);
}
