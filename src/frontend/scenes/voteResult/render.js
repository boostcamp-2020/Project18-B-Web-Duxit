import './style.scss';
import GameObject from '@engine/GameObject';
import TextObject from '@engine/TextObject';
import DuckObject from '@engine/DuckObject';
import CardManager from '@utils/CardManager';
import PlayerManager from '@utils/PlayerManager';
import SceneManager from '@utils/SceneManager';
import TEXT from '@utils/text';

const DIFF_Y_POSITION_STAMP = 14;
const DIFF_Y_POSITION_NAME = -18;
const DIFF_Y_POSITION_SCORE = -19;
const ORIGIN_STAMP = [50, 0];
const ORIGIN_NAME = [50, 0];
const ORIGIN_SCORE = [50, 0];
const WIDTH_STAMP_DUCK = 40;
const WIDTH_NAME_DUCK = 25;

const renderVoteResult = (endTime) => {
  const { ProgressBar } = SceneManager.sharedComponents;
  ProgressBar.setTime(endTime);
  ProgressBar.start();

  const cards = CardManager.submittedCards;
  const players = PlayerManager.getPlayers();

  const containers = cards.reduce((prev, card) => {
    card.removeClass('card-glow-gold-hover');
    const { position, cardID } = card;
    const [cardX, cardY] = position;
    const stampContainer = new GameObject({
      position: [cardX, cardY + DIFF_Y_POSITION_STAMP],
      origin: ORIGIN_STAMP,
    });
    stampContainer.addClass('stamp-wrapper');
    stampContainer.attachToRoot();

    const nameContainer = new GameObject({
      position: [cardX, cardY + DIFF_Y_POSITION_NAME],
      origin: ORIGIN_NAME,
    });
    nameContainer.addClass('name-wrapper');
    nameContainer.attachToRoot();

    const scoreContainer = new GameObject({
      position: [cardX, cardY + DIFF_Y_POSITION_SCORE],
      origin: ORIGIN_SCORE,
    });
    scoreContainer.addClass('score-wrapper');
    scoreContainer.attachToRoot();
    return {
      ...prev,
      [cardID]: {
        stampContainer,
        nameContainer,
        scoreContainer,
      },
    };
  }, {});

  const voteResultObjects = players.reduce((prev, player) => {
    const {
      color,
      votedCardID,
      submittedCardID,
      nickname,
      bTeller,
      score,
    } = player;

    const { nameContainer } = containers[submittedCardID];
    const nameDuck = new DuckObject({ color, width: WIDTH_NAME_DUCK });
    const nicknameText = new TextObject();
    nameDuck.addClass(['duck-stamp', 'result-duck']);
    nameDuck.attachToObject(nameContainer);
    nicknameText.setContent(nickname);
    nicknameText.addClass('nickname-text');
    nicknameText.attachToObject(nameContainer);

    const { scoreContainer } = containers[submittedCardID];
    const correctScore = new TextObject();
    if (score.correct) correctScore.setContent(`+ ${score.correct}`);
    correctScore.attachToObject(scoreContainer);
    correctScore.addClass('correct-score');
    const bonusScore = new TextObject();
    if (score.bonus) bonusScore.setContent(`+ ${score.bonus}`);
    bonusScore.attachToObject(scoreContainer);
    bonusScore.addClass('bonus-score');

    if (bTeller) {
      const tellerCard = cards.find((card) => card.cardID === submittedCardID);
      tellerCard.addClass('card-glow-gold');
      return [...prev, nameDuck, nicknameText, nameContainer];
    }

    const { stampContainer } = containers[votedCardID];
    const stampDuck = new DuckObject({ color, width: WIDTH_STAMP_DUCK });
    stampDuck.addClass(['duck-stamp', 'result-duck']);
    stampDuck.attachToObject(stampContainer);

    return [...prev, nameDuck, stampDuck, nicknameText, nameContainer];
  }, []);

  const HelpText = new TextObject();
  HelpText.addClass(['helper-text', 'vote-result-text']);
  HelpText.setContent(TEXT.VOTE_RESULT.TITLE);
  HelpText.attachToRoot();

  const stampContainers = Object.values(containers).map(
    (container) => container.stampContainer,
  );
  const arrayToBeRemoved = [HelpText, ...voteResultObjects, ...stampContainers];

  return {
    arrayToBeRemoved,
  };
};

export default renderVoteResult;
