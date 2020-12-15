import socket from '@utils/socket';

const setupVoteResult = () => {
  const onEndVoteResult = () => {};

  socket.on('end vote result', onEndVoteResult);
};

export default setupVoteResult;
