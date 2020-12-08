import ModalObject from '@engine/ModalObject';
import InputObject from '@engine/InputObject';
import CardObject from '@engine/CardObject';
import ButtonObject from '@engine/ButtonObject';
import TextObject from '@engine/TextObject';
import TEXT, { GET_IMAGE_PATH } from '@utils/text';

const onClickCard = ({
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

export default onClickCard;
