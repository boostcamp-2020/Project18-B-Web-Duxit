import './tellerSelectCard.scss';
import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import TEXT, { GET_IMAGE_PATH } from '@utils/text';
import TIME from '@utils/time';
import { TELLER_SELECT_CARD } from '@utils/scene';
import { createCards } from '@utils/card';
import CardManager from '@utils/CardManager';
import InputObject from '@engine/InputObject';
import ModalObject from '@engine/ModalObject';
import ButtonObject from '@engine/ButtonObject';
import CardObject from '@engine/CardObject';
import { sendTellerDicision } from './events';

const onClickTellerCard = ({
  okText = '확인',
  cancleText = '다시 선택',
  questionText = '이 카드를 표현하는 단어를 적어주세요!',
  cardID,
}) => {
  const Modal = new ModalObject();

  const modalTitle = new TextObject({ parent: Modal });
  modalTitle.setContent(questionText);
  modalTitle.addClass('modal-title');

  const modalInput = new InputObject({ parent: Modal });
  modalInput.addClass('modal-input');

  const okButton = new ButtonObject({ parent: Modal });
  okButton.addClass('modal-ok-button');
  okButton.setContent(okText);
  okButton.addClickHandler(() =>
    sendTellerDicision({ cardID, topic: modalInput.getValue(), Modal }),
  );

  const cancelButton = new ButtonObject({ parent: Modal });
  cancelButton.addClass('modal-cancel-button');
  cancelButton.setContent(cancleText);
  cancelButton.addClickHandler(() => Modal.delete());

  const modalCard = new CardObject({
    parent: Modal,
    imagePath: GET_IMAGE_PATH(cardID),
    facingUp: true,
  });
  modalCard.addClass('modal-card');
  modalCard.setWidth(270);
};

const renderTellerSelect = () => {
  const NotifyingTellerText = new TextObject();
  const tellerText = TEXT.TELLER_SELECT;
  NotifyingTellerText.addClass('notify-teller');
  NotifyingTellerText.attachToRoot();
  NotifyingTellerText.setContent(tellerText);

  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(TIME.SELECT_CARD);
  ProgressBar.start();

  const { CardsWrapper, cards } = createCards(
    TELLER_SELECT_CARD,
    CardManager.myCards,
  );
  CardsWrapper.attachToRoot();
  cards.forEach((card) => {
    card.addClass('card-glow-gold-hover');
    card.animateFlip(3000, true);
    card.setAnimateMove();
    card.addClickHandler(() => onClickTellerCard({ cardID: card.cardID }));
  });

  const arrayToBeRemoved = [NotifyingTellerText, ProgressBar, ...cards];

  return {
    arrayToBeRemoved,
  };
};

export default renderTellerSelect;
