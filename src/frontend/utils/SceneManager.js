import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import { $id } from '@utils/dom';
import PlayerManager from '@utils/PlayerManager';
import TIME from '@type/time';
import TEXT from '@utils/text';
import { WAITING_ROOM } from '@type/scene';

const root = $id('root');

const SceneManager = {
  currentScene: null,
  currentSceneType: WAITING_ROOM,
  sharedComponents: [],

  initializeComponents() {
    const AllReadyText = new TextObject();
    AllReadyText.addClass(['waiting-text-all-ready', 'hide']);
    AllReadyText.setContent('잠시 뒤 게임이 시작됩니다.');
    AllReadyText.attachToRoot();

    const SkipText = new TextObject();
    SkipText.addClass(['discussion-skip-text', 'hide']);
    SkipText.setContent(TEXT.DISCUSSION.SKIP);
    SkipText.attachToRoot();

    const ProgressBar = new ProgressBarObject();
    ProgressBar.createElement();
    ProgressBar.addClass('hide');
    ProgressBar.attachToRoot();

    this.sharedComponents = {
      AllReadyText,
      SkipText,
      ProgressBar,
    };
  },

  updateCurrentSceneType(sceneType) {
    this.currentSceneType = sceneType;
  },

  renderNextScene(scene, ...args) {
    let wrapupInterval = TIME.NONE_INTERVAL;
    this.hideAllDucks();

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

  hideAllDucks() {
    const players = PlayerManager.getPlayers();
    players.forEach((player) =>
      player.duck.setVisibility(false, player.isCurrentPlayer),
    );
  },
};

export default SceneManager;
