import PlayerManager from '@utils/PlayerManager';
import DuckObject from '@engine/DuckObject';
import { DUCK_TYPE } from '@type/duck';
import { $id } from '@utils/dom';
import renderWaitingRoom from './render';
import setupWaitingRoomSocket from './socket';
import { moveMyDuck } from './events';

const WaitingRoom = class {
  constructor(roomID) {
    this.roomID = roomID;
    this.ducks = new Map();
    this.duckMoveEvent = null;

    PlayerManager.onInitialize.push(this.addDucksOnInit.bind(this));
    PlayerManager.onUpdate.push(this.setNicknameInput.bind(this));
    PlayerManager.onUpdate.push(this.updateDucks.bind(this));
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
    $id('root').removeEventListener('click', this.duckMoveEvent);
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
    this.ducks.forEach((duck) => {
      duck.delete();
    });
  }

  setNicknameInput({ socketID, nickname }) {
    if (socketID === PlayerManager.currentPlayerID)
      this.NicknameInput.setValue(nickname);
  }

  addDucksOnInit(players = []) {
    players.forEach(this.createDuck.bind(this));
    const myDuck = this.ducks.get(PlayerManager.currentPlayerID);
    this.duckMoveEvent = (e) => moveMyDuck(e, myDuck);
    $id('root').addEventListener('click', this.duckMoveEvent);
  }

  updateDucks(player = {}) {
    const { socketID, color } = player;
    if (this.ducks.has(socketID)) this.ducks.get(socketID).setColor(color);
    else this.createDuck(player);
  }

  createDuck({ socketID, color = '' } = {}) {
    const duck = new DuckObject({ type: DUCK_TYPE.CURSOR });
    duck.setColor(color);
    duck.createElement();
    duck.setOriginCenter();
    duck.move(Math.random() * 50 + 25, Math.random() * 50 + 25, 0);
    duck.attachToRoot();
    this.ducks.set(socketID, duck);
  }
};

export default WaitingRoom;
