import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import ModalObject from '@engine/ModalObject';
import ButtonObject from '@engine/ButtonObject';
import CardObject from '@engine/CardObject';
import CardManager from '@utils/CardManager';
import TEXT, { GET_IMAGE_PATH } from '@utils/text';
import TIME from '@utils/time';
import { SELECT_CARD } from '@utils/scene';
import { createCards } from '@utils/card';
import { sendGuesserdecision } from './events';

const onClickTellerCard = ({ cardID, topic }) => {
  const Modal = new ModalObject();

  const modalTitle = new TextObject({ parent: Modal });
  modalTitle.setContent(TEXT.GUESSER_SELECT.TITLE(topic));
  modalTitle.addClass('modal-title');

  const okButton = new ButtonObject({ parent: Modal });
  okButton.addClass('modal-ok-button');
  okButton.setContent(TEXT.GUESSER_SELECT.OK);
  okButton.addClickHandler(() => sendGuesserdecision({ cardID, Modal }));

  const cancelButton = new ButtonObject({ parent: Modal });
  cancelButton.addClass('modal-cancel-button');
  cancelButton.setContent(TEXT.GUESSER_SELECT.CANCLE);
  cancelButton.addClickHandler(() => Modal.delete());

  const modalCard = new CardObject({
    parent: Modal,
    imagePath: GET_IMAGE_PATH(cardID),
    facingUp: true,
  });
  modalCard.addClass('modal-card');
  modalCard.setWidth(270);
};

const renderGuesserSelect = () => {
  const { topic, myCards } = CardManager;

  const TopicText = new TextObject();
  TopicText.addClass('topic-text');
  TopicText.attachToRoot();
  TopicText.setContent(topic);

  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(TIME.SELECT_CARD);
  ProgressBar.start();

  const { CardsWrapper, cards } = createCards(SELECT_CARD, myCards);
  CardsWrapper.attachToRoot();
  cards.forEach((card) => {
    card.addClass('card-glow-gold-hover');
    card.animateFlip(3000, true);
    card.setAnimateMove();
    card.addClickHandler(() =>
      onClickTellerCard({ cardID: card.cardID, topic }),
    );
  });

  const arrayToBeRemoved = [TopicText, ProgressBar, CardsWrapper, ...cards];

  return {
    arrayToBeRemoved,
  };
};

export default renderGuesserSelect;
