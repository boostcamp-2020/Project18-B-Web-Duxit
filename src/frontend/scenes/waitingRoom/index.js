import renderWaitingRoom from './render';
import setupWaitingRoomSocket from './socket';

const WaitingRoom = class {
  constructor(roomID) {
    this.roomID = roomID;
  }

  render() {
    const { arrayToBeRemoved, NicknameInput, AllReadyText } = renderWaitingRoom(
      this.roomID,
    );
    this.arrayToBeRemoved = arrayToBeRemoved;
    this.NicknameInput = NicknameInput;
    setupWaitingRoomSocket({ AllReadyText });
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }

  setNicknameInput(nickname) {
    this.NicknameInput.setValue(nickname);
  }
};

export default WaitingRoom;
