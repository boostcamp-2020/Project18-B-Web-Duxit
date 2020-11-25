import './waitingRoom.scss';
import ButtonObject from '../engine/ButtonObject';
import GameObject from '../engine/GameObject';
import TextObject from '../engine/TextObject';
import InputObject from '../engine/InputObject';
import SvgObject from '../engine/SvgObject';
import Svg from '../utils/svg';

const waitingRoom = () => {
  const Header = new GameObject();
  Header.toggleClass('waiting-header');
  Header.attachToRoot();

  const NicknameHelpText = new TextObject();
  NicknameHelpText.setContent('게임에 참여할 닉네임을 정해주세요');
  NicknameHelpText.setClass('waiting-nickname-help');
  NicknameHelpText.attachToObject(Header);

  const InputWrapper = new GameObject();
  InputWrapper.toggleClass('waiting-input-wrapper');
  InputWrapper.attachToObject(Header);

  const NicknameInput = new InputObject();
  NicknameInput.toggleClass('waiting-nickname-input');
  NicknameInput.attachToObject(InputWrapper);

  const RefreshButton = new ButtonObject();
  RefreshButton.setClass('refresh-button');
  RefreshButton.attachToObject(InputWrapper);

  const RefreshIcon = new SvgObject();
  RefreshIcon.setInnerHtml(Svg.refresh);
  RefreshIcon.attachToObject(RefreshButton);
};

export default waitingRoom;
