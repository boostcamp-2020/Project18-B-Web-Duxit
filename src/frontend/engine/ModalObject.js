import CSS from '@utils/CSS';
import { $qs } from '@utils/dom';
import GameObject from './GameObject';

const ModalObject = class extends GameObject {
  constructor() {
    super({ depth: CSS.Z_INDEX_MODAL });
    this.addClass('modal');
    $qs('.game-layout').appendChild(this.instance);
  }
};

export default ModalObject;
