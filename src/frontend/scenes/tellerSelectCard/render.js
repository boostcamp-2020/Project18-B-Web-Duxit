import './tellerSelectCard.scss';
import TextObject from '@engine/TextObject';
import TEXT from '@utils/text';

const renderTellerSelect = () => {
  const NotifyingTellerText = new TextObject();
  const tellerText = TEXT.TELLER_SELECT;
  NotifyingTellerText.addClass('notify-teller');
  NotifyingTellerText.attachToRoot();
  NotifyingTellerText.setContent(tellerText);

  const removeArray = [NotifyingTellerText];

  return {
    removeArray,
  };
};

export default renderTellerSelect;
