import socket from '@utils/socket';

const setupNewRoundStart = () => {
  const onGetRoundData = ({ isTeller, cards }) => {};

  socket.on('get round data', onGetRoundData);
};

export default setupNewRoundStart;
