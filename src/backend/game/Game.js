const randomStrings = new Set();

// 5개의 알파벳을 랜덤으로 생성. 이미 생성된 문자열일경우 다시 생성
const generateRandomString = () => {
  const randomString = Math.random().toString(36).substr(2, 5).toUpperCase();

  if (randomStrings.has(randomString)) return generateRandomString();

  randomStrings.add(randomString);
  return randomString;
};

export default class Game {
  constructor() {
    this.roomID = generateRandomString();
    this.users = new Map();
    this.status = {
      isPlaying: false,
      unusedCards: [],
      topic: '',
      turn: 0,
    };
  }

  getRoomID() {
    return this.roomID;
  }

  IsPlaying() {
    return this.status.isGaming;
  }
}
