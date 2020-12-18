import './style.scss';
import GameObject from '@engine/GameObject';
import TextObject from '@engine/TextObject';
import template from './template.html';
import { redirectToLobby, renderWaitingScene } from './events';

const renderPlayerGrid = (rowDucks, rowNicknames, rowScores, winnerID) => (
  player,
) => {
  const {
    socketID,
    nickname,
    score: { current: currentScore },
  } = player;
  const isWinner = winnerID === socketID;
  const Duck = player.makeDuck({
    classes: ['end-grid-item', isWinner && 'end-grid-winner'].filter(Boolean),
    parent: rowDucks,
  });
  if (isWinner) Duck.setCrown(true);
  const Nickname = new TextObject({
    classes: ['end-grid-item', isWinner && 'end-grid-winner'].filter(Boolean),
    parent: rowNicknames,
  }).setContent(nickname);
  const Score = new TextObject({
    classes: ['end-grid-item', isWinner && 'end-grid-winner'].filter(Boolean),
    parent: rowScores,
  }).setContent(currentScore);
};

const renderScoreboardLayout = ({ players, winnerID } = {}) => {
  const templateWrapper = document.createElement('div');
  templateWrapper.innerHTML = template;

  const Background = new GameObject();
  Background.instance = templateWrapper.firstChild;
  Background.attachToRoot();

  const [
    rowDucks,
    rowNicknames,
    rowScores,
    buttonGoMain,
    // buttonRestart,
  ] = Background.getObjectsByIds(
    'end-ducks',
    'end-nicknames',
    'end-scores',
    'end-button-go-main',
    // 'end-button-restart',
  );

  players.forEach(
    renderPlayerGrid(rowDucks, rowNicknames, rowScores, winnerID),
  );
  buttonGoMain.instance.addEventListener('click', redirectToLobby);
  // buttonRestart.instance.addEventListener('click', renderWaitingScene);

  const arrayToBeRemoved = [Background];
  return {
    arrayToBeRemoved,
  };
};

export default renderScoreboardLayout;
