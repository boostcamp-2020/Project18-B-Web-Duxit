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

export const onClickGuide = async () => {
  const Modal = new ModalObject();

  const modalTitle = new TextObject({ parent: Modal });
  modalTitle.setContent('사용 설명서');
  modalTitle.addClass('modal-title');

  const guideContentWrapper = new GameObject({
    parent: Modal,
    origin: [50, 50],
    position: [50, -50],
  });
  guideContentWrapper.addClass('guide-content-wrapper');
  const guideLeftPageWrapper = new GameObject({
    parent: guideContentWrapper,
  });
  guideLeftPageWrapper.addClass('guide-left-page-wrapper');

  const guideRightPageWrapper = new GameObject({
    parent: guideContentWrapper,
  });
  guideRightPageWrapper.addClass('guide-right-page-wrapper');

  const guideContentRightText = new TextObject({
    parent: guideRightPageWrapper,
  });
  guideContentRightText.addClass('guide-right-content');
  guideContentRightText.setContent(TEXT.GUIDE.CONTENT_RIGHT);

  const guideContentLeftText = new TextObject({
    parent: guideLeftPageWrapper,
  });
  guideContentLeftText.addClass('guide-left-content');
  guideContentLeftText.setContent(TEXT.GUIDE.CONTENT_LEFT);

  const closeButton = new ButtonObject({ parent: Modal });
  closeButton.addClass('modal-close');
  closeButton.setContent('닫기');
  closeButton.addClickHandler(() => {
    Modal.delete();
  });

  await guideContentWrapper.move(50, 50, 500);
  await guideContentWrapper.move(70, 50, 500);
};
