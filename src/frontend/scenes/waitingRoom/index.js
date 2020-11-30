import './waitingRoom.scss';
import ButtonObject from '@engine/ButtonObject';
import GameObject from '@engine/GameObject';
import TextObject from '@engine/TextObject';
import InputObject from '@engine/InputObject';
import SvgObject from '@engine/SvgObject';
import CardObject from '@engine/CardObject';
import Svg from '@utils/svg';
import socket from '@utils/socket';
import { copyGameCode, redirectToLobby } from './events';

import frontImage from '../../resources/front.png';

export const renderWaitingRoom = (roomID = '') => {
  const Header = new GameObject();
  Header.toggleClass('waiting-header');
  Header.attachToRoot();

  const NicknameHelpText = new TextObject();
  NicknameHelpText.setContent('게임에 참여할 닉네임을 정해주세요');
  NicknameHelpText.setClass('waiting-nickname-help');
  NicknameHelpText.attachToObject(Header);

  const InputWrapper = new GameObject();
  InputWrapper.setClass('waiting-input-wrapper');
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

  const ActionWrapper = new GameObject();
  ActionWrapper.toggleClass('waiting-action-wrapper');
  ActionWrapper.attachToRoot();

  const ButtonReturnToLobby = new ButtonObject();
  ButtonReturnToLobby.setContent('로비로 돌아가기');
  ButtonReturnToLobby.setClass('button-cancel');
  ButtonReturnToLobby.attachToObject(ActionWrapper);
  ButtonReturnToLobby.addClickHandler(redirectToLobby);

  const ButtonReady = new ButtonObject();
  ButtonReady.setContent('준비 완료');
  ButtonReady.setClass('button-primary');
  ButtonReady.attachToObject(ActionWrapper);

  const GameCodeWrapper = new ButtonObject();
  GameCodeWrapper.setClass('waiting-game-code-wrapper');
  GameCodeWrapper.attachToRoot();
  GameCodeWrapper.addClickHandler(copyGameCode);

  const GameCodeText = new TextObject();
  GameCodeText.setContent(roomID);
  GameCodeText.attachToObject(GameCodeWrapper);

  const GameCodeCopyButton = new GameObject();
  GameCodeCopyButton.setClass('waiting-code-icon');
  GameCodeCopyButton.attachToObject(GameCodeWrapper);

  const CopyIcon = new SvgObject();
  CopyIcon.setInnerHtml(Svg.copy);
  CopyIcon.attachToObject(GameCodeCopyButton);

  const Card1 = new CardObject();
  Card1.attachToRoot();
  Card1.move('10%', '22%', 0);

  const Card2 = new CardObject({
    imagePath: frontImage,
    facingUp: false,
    position: ['50%', '50%'],
  });
  Card2.attachToRoot();

  const randomizeCard = (card) => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const angle = Math.random() * 360 - 180;
    card.move(`${randomX}%`, `${randomY}%`, 1);
    card.rotate(`${angle}deg`);
    card.animateFlip();
  };

  document.addEventListener('click', () => {
    randomizeCard(Card1);
    randomizeCard(Card2);
  });

  return {
    NicknameInput,
  };
};

export const setupWaitingRoomSocket = () => {};
