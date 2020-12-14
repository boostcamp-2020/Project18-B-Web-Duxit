import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import GuesserSelectCard from '@scenes/guesserSelectCard';
import { $id } from '@utils/dom';
import PlayerManager from '@utils/PlayerManager';
import TIME from '@type/time';
import TEXT from '@utils/text';

const root = $id('root');

const SceneManager = {
  currentScene: null,
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

  renderNextScene(scene, ...args) {
    const { ProgressBar } = this.sharedComponents;
    let wrapupInterval = TIME.NONE_INTERVAL;
    this.hideAllDucks();

    if (ProgressBar.progressBarTimer && !this.currentScene.passingTimerClear) {
      ProgressBar.clear();
    }

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
