import GameObject from '@engine/GameObject';
import DuckObject from '@engine/DuckObject';
import TextObject from '@engine/TextObject';
import { ROOT, BACKGROUND } from '@utils/dom';
import stonePosition from '@type/stonePosition.json';
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

const getMaximumScoreDifference = (players) =>
  players.reduce(
    (max, player) => Math.max(max, player.totalScore - player.score),
    0,
  );

const getTotalAnimationTime = (players) => {
  const maxJumpCount = getMaximumScoreDifference(players) + 1;
  return 4000 + maxJumpCount * 500;
};

const yellowDuckyJumpsOverTheLazyStone = (players) =>
  players.map(({ color, score: currentScore = 0, totalScore } = {}) => {
    const duck = new DuckObject({
      color,
      width: 50,
      classes: ['movable'],
      position: stonePosition[currentScore],
      origin: [50, 90],
      depth: 10,
    });
    BACKGROUND.appendChild(duck.instance);

    const jumpCount = totalScore - currentScore + 1;
    const jumpTiming = (index) => 1000 + 500 * index;
    [...Array(jumpCount)].forEach((_, index) => {
      setTimeout(() => {
        duck.jump(...stonePosition[currentScore + index], 500);
      }, jumpTiming(index));
    });
    return duck;
  });

const animateBackground = (players, totalAnimationTime, isGameOver) => {
  setTimeout(() => {
    ROOT.style.transform = 'scale(0.6)';
    const ducks = yellowDuckyJumpsOverTheLazyStone(players);
    if (!isGameOver) {
      setTimeout(() => {
        ROOT.style.transform = null;
        ducks.forEach((duck) => {
          duck.setDepth(0);
          setTimeout(() => {
            duck.delete();
          }, 1000);
        });
      }, totalAnimationTime - 2000);
    }
  }, 2000);
};

const renderScoreboardLayout = ({
  round,
  players,
  scoreData,
  isGameOver,
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

  const playersWithScore = players.map((player) => ({
    ...player,
    ...scoreData.find((data) => data.socketID === player.socketID),
  }));
  const totalAnimationTime = getTotalAnimationTime(playersWithScore);

  animateBackground(playersWithScore, totalAnimationTime, isGameOver);

  const arrayToBeRemoved = [Background];
  return {
    arrayToBeRemoved,
    totalAnimationTime,
  };
};

export default renderScoreboardLayout;
