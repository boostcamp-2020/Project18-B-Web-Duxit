import ioClient from 'socket.io-client';

const initializeSocket = () => {
  const socket = ioClient(process.env.API_BASE_URL);

  socket.on('game terminated', () => {
    alert('게임 도중 플레이어가 나가서 게임이 종료됩니다');
    window.location.href = '/';
  });

  return socket;
};

const socket = initializeSocket();

export default socket;
