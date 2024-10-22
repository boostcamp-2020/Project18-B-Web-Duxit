import './left.scss';
import { $id } from '@utils/dom';
import DuckLeftTabObject from '@engine/DuckLeftTabObject';
import PlayerManager from '@utils/PlayerManager';
import { activateVoiceChat, deactivateVoiceChat } from './voiceChat';

const createDuck = (duckInfo) => {
  const { socketID, color, nickname } = duckInfo;
  const duck = new DuckLeftTabObject({ socketID, color, nickname });
  return duck;
};

class LeftTab {
  constructor() {
    this.ducks = [];
    this.voiceActive = false;
    PlayerManager.onInitialize.push(this.initializePlayers.bind(this));
    PlayerManager.onUpdate.push(this.updateDuck.bind(this));
    PlayerManager.onDelete.push(this.deletePlayer.bind(this));
    $id('microphone-controller').addEventListener(
      'click',
      this.toggleVoiceChat,
    );
  }

  initializePlayers() {
    this.render();
  }

  toggleVoiceChat() {
    if (this.voiceActive) {
      this.voiceActive = false;
      deactivateVoiceChat();
    } else {
      this.voiceActive = true;
      activateVoiceChat();
    }
  }

  findDuck(socketID) {
    return this.ducks.find((player) => player.socketID === socketID);
  }

  updateDuck(playerInfo) {
    const updatedDuck = this.findDuck(playerInfo.socketID);
    if (updatedDuck) {
      updatedDuck.setHat(playerInfo.bTeller);
      updatedDuck.update(playerInfo);
    } else this.addDuck(playerInfo);
  }

  updateScore(players) {
    players.forEach(({ socketID, score }) => {
      this.findDuck(socketID).setScore(score);
    });
  }

  deletePlayer(playerInfo) {
    const deletedPlayer = this.findDuck(playerInfo.socketID);
    const playerWrapper = $id('participants-wrapper');
    playerWrapper.removeChild(deletedPlayer.instance);
    this.ducks = this.ducks.filter(
      (player) => player.socketID !== playerInfo.socketID,
    );
    this.renderCount();
  }

  addDuck(playerInfo) {
    const duck = createDuck(playerInfo);
    const playerWrapper = $id('participants-wrapper');
    this.ducks = [...this.ducks, duck];
    playerWrapper.appendChild(duck.instance);
    this.renderCount();
  }

  renderCount() {
    const playerCount = $id('participants-count');
    playerCount.innerText = this.ducks.length;
  }

  render() {
    this.renderCount();
    const playerWrapper = $id('participants-wrapper');
    this.ducks.forEach((player) => {
      playerWrapper.appendChild(player.instance);
    });
  }
}

export default new LeftTab();
