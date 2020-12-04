import { $id } from '@utils/dom';

const root = $id('root');

const SceneManager = {
  currentScene: null,

  renderNextScene(scene, ...args) {
    if (this.currentScene) this.currentScene.wrapup();
    scene.render(root, args);
    this.currentScene = scene;
  },

  isCurrentScene(classObject) {
    return this.currentScene.constructor.name === classObject.name;
  },
};

export default SceneManager;
