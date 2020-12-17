const audioContainer = document.getElementById('voice-chat-audio-container');

const addAudioStream = ({ mediaConnection, peerMap }) => {
  const socketID = mediaConnection.peer;

  if (peerMap.has(socketID)) return;

  const audioElement = document.createElement('audio');

  mediaConnection.on('stream', (stream) => {
    // eslint-disable-next-line no-param-reassign
    audioElement.srcObject = stream;
    audioElement.addEventListener('loadedmetadata', () => {
      audioElement.play();
    });
    audioContainer.append(audioElement);
  });

  mediaConnection.on('close', () => {
    audioElement.remove();
  });

  peerMap.set(socketID, {
    mediaConnection,
    audioElement,
  });
};

// socket을 통해 다른 사람이 접속한걸 받았을 때
// 다른 사람에게 mediaConnection 요청을 보냄
const connectToNewUser = ({ peer, socketID, stream, peerMap }) => {
  const mediaConnection = peer.call(socketID, stream);
  addAudioStream({ mediaConnection, peerMap });
};

// 내가 다른 사람의 mediaConnection 요청을 받았을 때
const setAnswerBehavior = ({ stream, peerMap, peer }) => {
  peer.on('call', (mediaConnection) => {
    // 다른 사람의 요청에 answer를 날림
    mediaConnection.answer(stream);
    addAudioStream({ mediaConnection, peerMap });
  });
};

const getAudioStream = () =>
  navigator.mediaDevices.getUserMedia({
    audio: true,
  });

export { getAudioStream, setAnswerBehavior, connectToNewUser };
