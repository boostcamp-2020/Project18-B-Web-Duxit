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

function onStartDiscussion() {
  const socket = this;
  const { game } = socket;
  const { roomID } = game;
  if (!game.status.firstDiscussionUser) {
    game.setEndTime(TIME.WAIT_DISCUSSION);
    game.toggleFirstDiscussionUser();
  }
  const { endTime } = game;
  socket.in(roomID).emit('start discussion', { endTime });
  socket.emit('start discussion', { endTime });
  const currentTime = new Date().getTime();
  const targetTime = new Date(endTime - currentTime).getTime();
  setTimeout(() => {
    socket.in(roomID).emit('end discussion');
    socket.emit('end discussion');
  }, targetTime);
}

export default function onDiscussion(socket) {
  socket.on('skip player', onSkipPlayer);
  socket.on('mix card end', onStartDiscussion);
}
