import renderWaitingRoom from './render';
import setupWaitingRoomSocket from './socket';

const WaitingRoom = class {
  constructor(roomID) {
    this.roomID = roomID;
  }

  render() {
    const { removeArray, NicknameInput, AllReadyText } = renderWaitingRoom(
      this.roomID,
    );
    this.removeArray = removeArray;
    this.NicknameInput = NicknameInput;
    setupWaitingRoomSocket({ AllReadyText });
  }

  wrapup() {
    this.removeArray.forEach((gameObject) => {
      gameObject.delete();
    });
  }

  setNicknameInput(nickname) {
    this.NicknameInput.setValue(nickname);
  }
};

export default WaitingRoom;
