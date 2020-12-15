import SceneManager from '@utils/SceneManager';
import WaitingRoom from '@scenes/waitingRoom';

export const redirectToLobby = () => {
  window.location.href = '/';
};

export const renderWaitingScene = () => {
  SceneManager.renderNextScene(new WaitingRoom());
};
