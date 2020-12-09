import PlayerManager from '@utils/PlayerManager';
import renderWaitingRoom from './render';
import setupWaitingRoomSocket from './socket';

const WaitingRoom = class {
  constructor(roomID) {
    this.roomID = roomID;
    this.ducks = new Map();
    this.duckMoveEvent = null;
  }

  render() {
    const { arrayToBeRemoved, NicknameInput, AllReadyText } = renderWaitingRoom(
      this.roomID,
    );
    this.arrayToBeRemoved = arrayToBeRemoved;
    this.NicknameInput = NicknameInput;
    setupWaitingRoomSocket({ AllReadyText });

    PlayerManager.onUpdate.push(this.onUpdate.bind(this));
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
