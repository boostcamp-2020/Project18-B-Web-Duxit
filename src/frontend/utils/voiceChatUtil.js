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

const connectToNewUser = ({ peer, socketID, stream, peerMap }) => {
  const mediaConnection = peer.call(socketID, stream);
  addAudioStream({ mediaConnection, peerMap });
};

const setAnswerBehavior = ({ stream, peerMap, peer }) => {
  peer.on('call', (mediaConnection) => {
    mediaConnection.answer(stream);
    addAudioStream({ mediaConnection, peerMap });
  });
};

const getAudioStream = () =>
  navigator.mediaDevices.getUserMedia({
    audio: true,
  });

export { getAudioStream, setAnswerBehavior, connectToNewUser };
