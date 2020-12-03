import PlayerManager from '@utils/PlayerManager';
import renderWaitingRoom from './render';
import setupWaitingRoomSocket from './socket';

const WaitingRoom = class {
  constructor(roomID) {
    this.roomID = roomID;

    PlayerManager.onUpdate.push(this.setNicknameInput.bind(this));
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

  setNicknameInput({ socketID, nickname }) {
    if (socketID === PlayerManager.currentPlayerID)
      this.NicknameInput.setValue(nickname);
  }
};

export default WaitingRoom;
