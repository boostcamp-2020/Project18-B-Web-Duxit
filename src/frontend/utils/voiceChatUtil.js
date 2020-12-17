import { $id, $qs } from '@utils/dom';

const peerMap = new Map();
const audioContainer = $id('voice-chat-audio-container');

const getDuckSpeaker = (socketID) => {
  const duckWrapper = $qs(`.left-duck-wrapper[data-socket-id="${socketID}"]`);

  if (!duckWrapper) return null;

  const duckSpeaker = duckWrapper.querySelector('.duck-speaker');

  return duckSpeaker;
};

const getVoiceButton = () => {
  return $id('microphone-controller');
};

const duckSpeakerHandler = ({ target }) => {
  const duckSpeaker = target;
  const socketID = duckSpeaker.closest('.left-duck-wrapper').dataset.socketId;
  const { audioElement } = peerMap.get(socketID);
  if (duckSpeaker.classList.contains('duck-speaker-deactive')) {
    audioElement.muted = false;
    duckSpeaker.classList.add('duck-speaker-active');
    duckSpeaker.classList.remove('duck-speaker-deactive');
  } else {
    audioElement.muted = true;
    duckSpeaker.classList.add('duck-speaker-deactive');
    duckSpeaker.classList.remove('duck-speaker-active');
  }
};

// 받은 mediaConnection으로 실제 오디오 엘리먼트 생성
const addAudioStream = ({ mediaConnection }) => {
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

  const duckSpeaker = getDuckSpeaker(socketID);
  duckSpeaker.classList.add('duck-speaker-active');
  duckSpeaker.addEventListener('click', duckSpeakerHandler);

  peerMap.set(socketID, {
    mediaConnection,
    audioElement,
  });
};

// socket을 통해 다른 사람이 접속한걸 받았을 때
// 다른 사람에게 mediaConnection 요청을 보냄
const connectToNewUser = ({ peer, socketID, stream }) => {
  const mediaConnection = peer.call(socketID, stream);
  addAudioStream({ mediaConnection, peerMap });
};

// 내가 다른 사람의 mediaConnection 요청을 받았을 때
const setAnswerBehavior = ({ stream, peer }) => {
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

const closeVoiceButton = () => {
  const voiceButton = getVoiceButton();
  voiceButton.disabled = true;
};

const transformVoiceButton = () => {
  const voiceButton = getVoiceButton();
  const voiceButtonSpan = voiceButton.querySelector('span');
  voiceButtonSpan.innerText = '음성 채팅 나가기';
  voiceButton.classList.add('microphone-controller-exit');
  voiceButton.disabled = false;
};

const putBackVoiceButton = () => {
  const voiceButton = getVoiceButton();
  const voiceButtonSpan = voiceButton.querySelector('span');
  voiceButtonSpan.innerText = '음성 채팅 참여';
  voiceButton.classList.remove('microphone-controller-exit');
};

const removeDuckSpeaker = (socketID) => {
  const duckSpeaker = getDuckSpeaker(socketID);

  if (!duckSpeaker) return;

  duckSpeaker.removeEventListener('click', duckSpeakerHandler);

  duckSpeaker.classList.remove('duck-speaker-active', 'duck-speaker-deactive');
};

const deleteOtherPeer = (socketID) => {
  if (peerMap.has(socketID)) {
    peerMap.get(socketID).mediaConnection.close();
    peerMap.delete(socketID);
    removeDuckSpeaker(socketID);
  }
};

export {
  getAudioStream,
  setAnswerBehavior,
  connectToNewUser,
  peerMap,
  deleteOtherPeer,
  closeVoiceButton,
  transformVoiceButton,
  putBackVoiceButton,
};
