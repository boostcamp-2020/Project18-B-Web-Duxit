import CSS from '@type/css';
import GameObject from './GameObject';

const ModalObject = class extends GameObject {
  constructor() {
    super({ depth: CSS.Z_INDEX_MODAL });
    this.addClass('modal');
    this.instance.style.opacity = '0';
    setTimeout(() => {
      this.instance.style.opacity = '1';
    });
    this.attachToRoot();
  }
};

export default ModalObject;
