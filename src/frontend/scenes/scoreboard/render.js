import './style.scss';
import GameObject from '@engine/GameObject';
import TextObject from '@engine/TextObject';
import { ROOT, BACKGROUND, $qs } from '@utils/dom';
import stonePosition from '@type/stonePosition.json';
import CardManager from '@utils/CardManager';
import template from './template.html';

const defineRenderRow = (TableBody) => (player) => {
  const {
    nickname,
    bTeller,
    score: { current, correct, bonus },
  } = player;
  const TableRow = new GameObject({
    classes: ['scoreboard-table-row'],
    parent: TableBody,
  });
  const PlayerInfoWrapper = new GameObject({
    classes: ['scoreboard-table-player'],
    parent: TableRow,
  });
  const DuckIcon = player.makeDuck({
    width: 60,
    parent: PlayerInfoWrapper,
  });
  DuckIcon.setHat(bTeller);
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

const makeRandom = (x) => Math.random() * 5 + x - 2.5;

const yellowDuckyJumpsOverTheLazyStone = (players) =>
  players.map((player) => {
    const {
      score: { current, correct, bonus },
    } = player;
    const currentStone = stonePosition[current];
    const currentPosition = currentStone.map(makeRandom);
    const duck = player.makeDuck({
      width: 50,
      classes: ['movable'],
      position: currentPosition,
      origin: [50, 90],
      depth: 10,
    });
    BACKGROUND.appendChild(duck.instance);

    const jumpCount = correct + bonus + 1;
    const jumpTiming = (index) => 1000 + 500 * index;
    [...Array(jumpCount)].forEach((_, index) => {
      const nextStone = Math.min(30, current + index);
      setTimeout(() => {
        const nextPosition = stonePosition[nextStone].map(makeRandom);
        duck.jump(...nextPosition, 500);
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
  const cards = CardManager.submittedCards;
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

  const topicText = $qs('.topic-text');
  topicText.remove();
  const arrayToBeRemoved = [...cards, Background];
  return {
    arrayToBeRemoved,
  };
};

export default renderScoreboardLayout;
