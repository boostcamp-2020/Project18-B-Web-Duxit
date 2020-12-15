import GameObject from '@engine/GameObject';
import TextObject from '@engine/TextObject';
import './style.scss';
import template from './template.html';

const renderPlayerGrid = (rowDucks, rowNicknames, rowScores, winnerID) => (
  player,
) => {
  const { socketID, nickname, score } = player;
  const isWinner = winnerID === socketID;
  const Duck = player.makeDuck({
    classes: ['end-grid-item', isWinner && 'end-grid-winner'].filter(Boolean),
    parent: rowDucks,
  });
  const Nickname = new TextObject({
    classes: ['end-grid-item', isWinner && 'end-grid-winner'].filter(Boolean),
    parent: rowNicknames,
  }).setContent(nickname);
  const Score = new TextObject({
    classes: ['end-grid-item', isWinner && 'end-grid-winner'].filter(Boolean),
    parent: rowScores,
  }).setContent(score);
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
    buttonRestart,
  ] = Background.getObjectsByIds(
    'end-ducks',
    'end-nicknames',
    'end-scores',
    'end-button-go-main',
    'end-button-restart',
  );

  players.forEach(
    renderPlayerGrid(rowDucks, rowNicknames, rowScores, winnerID),
  );

  const arrayToBeRemoved = [Background];
  return {
    arrayToBeRemoved,
  };
};

export default renderScoreboardLayout;
