import { $id } from '@utils/dom';
import PlayerManager from '@utils/PlayerManager';
import TIME from '@type/time';

const root = $id('root');

const SceneManager = {
  currentScene: null,

  renderNextScene(scene, ...args) {
    let wrapupInterval = TIME.NONE_INTERVAL;
    this.removeAllDucks();

    if (this.currentScene) {
      this.currentScene.wrapup();
      wrapupInterval = this.currentScene.wrapupInterval || TIME.NONE_INTERVAL;
    }
    setTimeout(() => {
      scene.render(root, args);
      this.currentScene = scene;
    }, wrapupInterval);
  },

  isCurrentScene(classObject) {
    return this.currentScene.constructor.name === classObject.name;
  },

  removeAllDucks() {
    const players = PlayerManager.getPlayers();
    players.forEach((player) =>
      player.duck.setVisibility(false, player.isCurrentPlayer),
    );
  },
};

export default SceneManager;
