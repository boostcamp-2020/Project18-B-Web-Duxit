import GameObject from '@engine/GameObject';
import './style.scss';
import template from './template.html';

const renderScoreboardLayout = () => {
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

  const arrayToBeRemoved = [Background];
  return {
    arrayToBeRemoved,
  };
};

export default renderScoreboardLayout;
