import './style.scss';
import GameObject from '@engine/GameObject';
import DuckObject from '@engine/DuckObject';
import TextObject from '@engine/TextObject';
import { ROOT, BACKGROUND } from '@utils/dom';
import stonePosition from '@type/stonePosition.json';
import template from './template.html';

const defineRenderRow = (TableBody) => ({
  nickname,
  color,
  isTeller,
  score: { current, correct, bonus },
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
  }).setContent(`+${correct}`);
  const BonusScoreObject = new TextObject({
    classes: ['scoreboard-table-score'],
    parent: TableRow,
  }).setContent(`+${bonus}`);
  const TotalScoreObject = new TextObject({
    classes: ['scoreboard-table-score'],
    parent: TableRow,
  }).setContent(`${current + correct + bonus}`);
};

const renderRow = (TableBody, players) => {
  players.forEach(defineRenderRow(TableBody));
};

const getMaximumScoreDifference = (players) =>
  players.reduce(
    (max, player) => Math.max(max, player.score.correct + player.score.bonus),
    0,
  );

const getTotalAnimationTime = (players) => {
  const maxJumpCount = getMaximumScoreDifference(players) + 1;
  return 4000 + maxJumpCount * 500;
};

const yellowDuckyJumpsOverTheLazyStone = (players) =>
  players.map(({ color, score: { current, correct, bonus } } = {}) => {
    const duck = new DuckObject({
      color,
      width: 50,
      classes: ['movable'],
      position: stonePosition[current],
      origin: [50, 90],
      depth: 10,
    });
    BACKGROUND.appendChild(duck.instance);

    const jumpCount = correct + bonus + 1;
    const jumpTiming = (index) => 1000 + 500 * index;
    [...Array(jumpCount)].forEach((_, index) => {
      const nextPosition = Math.min(30, current + index);
      setTimeout(() => {
        duck.jump(...stonePosition[nextPosition], 500);
      }, jumpTiming(index));
    });
    return duck;
  });

const animateBackground = (players) => {
  setTimeout(() => {
    ROOT.style.transform = 'scale(0.6)';
    const ducks = yellowDuckyJumpsOverTheLazyStone(players);
    // if (!isGameOver) {
    setTimeout(() => {
      ROOT.style.transform = null;
      ducks.forEach((duck) => {
        duck.setDepth(0);
        setTimeout(() => {
          duck.delete();
        }, 1000);
      });
    }, 8000);
    // }
  }, 2000);
};

const renderScoreboardLayout = ({
  round,
  players,
  // scoreData,
  // isGameOver,
} = {}) => {
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

  renderRow(TableBody, players);
  animateBackground(players);

  const arrayToBeRemoved = [Background];
  return {
    arrayToBeRemoved,
  };
};

export default renderScoreboardLayout;
