import PlayerManager from '@utils/PlayerManager';
import { shouldUseBlack } from '@utils/hexColor';
import renderWaitingRoom from './render';
import setupWaitingRoomSocket from './socket';

const WaitingRoom = class {
  constructor(roomID) {
    this.roomID = roomID;
    this.ducks = new Map();
    this.duckMoveEvent = null;

  }

  render() {
    const {
      arrayToBeRemoved,
      NicknameInput,
      AllReadyText,
      ColorButton,
      RandomColorButton,
      ColorInput,
    } = renderWaitingRoom(this.roomID);
    this.arrayToBeRemoved = arrayToBeRemoved;
    this.NicknameInput = NicknameInput;
    this.ColorButton = ColorButton;
    this.RandomColorButton = RandomColorButton;
    this.ColorInput = ColorInput;
    setupWaitingRoomSocket({ AllReadyText });

    PlayerManager.onUpdate.push(this.onUpdate.bind(this));
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }

  onUpdate({ socketID, color, nickname }) {
    if (socketID === PlayerManager.currentPlayerID) {
      if (nickname) this.NicknameInput.setValue(nickname);
      if (color) this.updateColorButtons(color);
    }
  }

  updateColorButtons(color) {
    this.ColorButton.instance.style.backgroundColor = color;
    this.RandomColorButton.instance.style.backgroundColor = color;
    this.ColorInput.setValue(color);
    if (shouldUseBlack(color)) {
      this.ColorButton.removeClass('color-white');
      this.RandomColorButton.removeClass('color-white');
    } else {
      this.ColorButton.addClass('color-white');
      this.RandomColorButton.addClass('color-white');
    }
  }
};

export default WaitingRoom;
