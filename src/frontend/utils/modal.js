import GameObject from '@engine/GameObject';
import ModalObject from '@engine/ModalObject';
import InputObject from '@engine/InputObject';
import CardObject from '@engine/CardObject';
import ButtonObject from '@engine/ButtonObject';
import TextObject from '@engine/TextObject';
import TEXT, { GET_IMAGE_PATH } from '@utils/text';

export const onClickCard = ({
  textType,
  cardID,
  topic,
  submitEvent,
  input = false,
}) => {
  const Modal = new ModalObject();
  const paramsOfHandler = { cardID, Modal };

  const modalTitle = new TextObject({ parent: Modal });
  modalTitle.setContent(TEXT[textType].TITLE(topic));
  modalTitle.addClass('modal-title');

  if (input) {
    const modalInput = new InputObject({ parent: Modal });
    modalInput.addClass('modal-input');
    paramsOfHandler.input = modalInput;
  }

  const cancelButton = new ButtonObject({ parent: Modal });
  cancelButton.addClass('modal-cancel-button');
  cancelButton.setContent(TEXT[textType].CANCLE);
  cancelButton.addClickHandler(() => Modal.delete());

  const modalCard = new CardObject({
    parent: Modal,
    imagePath: GET_IMAGE_PATH(cardID),
    facingUp: true,
  });
  modalCard.addClass('modal-card');
  modalCard.setWidth(270);

  const okButton = new ButtonObject({ parent: Modal });
  okButton.addClass('modal-ok-button');
  okButton.setContent(TEXT[textType].OK);
  okButton.addClickHandler(() => submitEvent(paramsOfHandler));
};

export const onClickGuide = () => {
  const Modal = new ModalObject();

  const modalTitle = new TextObject({ parent: Modal });
  modalTitle.setContent('사용 설명서');
  modalTitle.addClass('modal-title');

  const guideContentWrapper = new GameObject({ parent: Modal });
  guideContentWrapper.addClass('guide-content-wrapper');

  const guideContentText = new TextObject({ parent: guideContentWrapper });
  guideContentText.addClass('guide-content');
  guideContentText.setContent(TEXT.GUIDE.CONTENT);

  const closeButton = new ButtonObject({ parent: Modal });
  closeButton.addClass('modal-close');
  closeButton.setContent('계속하기');
  closeButton.addClickHandler(() => {
    Modal.delete();
  });
};
