import GameObject from '@engine/GameObject';
import './style.scss';
import template from './template.html';

const renderScoreboardLayout = ({ round, players, scoreData } = {}) => {
  const templateWrapper = document.createElement('div');
  templateWrapper.innerHTML = template;

  const Background = new GameObject();
  Background.instance = templateWrapper.firstChild;
  Background.attachToRoot();

  Background.instance.querySelector(
    '#scoreboard-title',
  ).innerText = `Round ${round} 획득 점수`;

  const TableBody = new GameObject();
  TableBody.instance = Background.instance.querySelector(
    '#scoreboard-table-body',
  );

  const arrayToBeRemoved = [Background];
  return {
    arrayToBeRemoved,
  };
};

export default renderScoreboardLayout;
