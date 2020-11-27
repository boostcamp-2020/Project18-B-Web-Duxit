import ioClient from 'socket.io-client';

const initializeSocket = () => {
  const socket = ioClient(process.env.API_BASE_URL);
  return socket;
};

const socket = initializeSocket();

export default socket;
