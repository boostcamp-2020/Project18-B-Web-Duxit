import GameObject from '@engine/GameObject';
import DuckObject from '@engine/DuckObject';
import TextObject from '@engine/TextObject';
import './style.scss';
import template from './template.html';

const renderRow = (TableBody) => ({
  nickname,
  color,
  isTeller,
  isCurrentPlayer,
  score: currentScore,
  correctScore,
  bonusScore,
  totalScore,
} = {}) => {
  const TableRow = new GameObject({
    classes: ['scoreboard-table-row'],
    parent: TableBody,
  });
  const PlayerInfoWrapper = new GameObject({
    classes: ['scoreboard-table-player'],
    parent: TableRow,
  });
  const DuckIcon = new DuckObject({
    color,
    width: 60,
    parent: PlayerInfoWrapper,
  });
  DuckIcon.setHat(isTeller);
  const NicknameObject = new TextObject({
    parent: PlayerInfoWrapper,
  }).setContent(nickname);

  const CorrectScoreObject = new TextObject({
    classes: ['scoreboard-table-score'],
    parent: TableRow,
  }).setContent(`+${correctScore}`);
  const BonusScoreObject = new TextObject({
    classes: ['scoreboard-table-score'],
    parent: TableRow,
  }).setContent(`+${bonusScore}`);
  const TotalScoreObject = new TextObject({
    classes: ['scoreboard-table-score'],
    parent: TableRow,
  }).setContent(`${totalScore}`);
};

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

  const playersWithScore = players.map((player) => ({
    ...player,
    ...scoreData.find((data) => data.socketID === player.socketID),
  }));
  const renderRowInTableBody = renderRow(TableBody);

  playersWithScore.forEach(renderRowInTableBody);

  const arrayToBeRemoved = [Background];
  return {
    arrayToBeRemoved,
  };
};

export default renderScoreboardLayout;
