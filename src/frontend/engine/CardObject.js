import backImage from '@resources/back.png';
import GameObject from './GameObject';
import ImageObject from './ImageObject';

const getFacingStyle = (isUp) => (isUp ? 'rotateY(0deg)' : 'rotateY(180deg)');
const deg2rad = (deg) => (deg * Math.PI) / 180;
const MOVE_PERCENT = 10;

const CardObject = class extends GameObject {
  constructor({
    imagePath = backImage, // default: 뒷면 이미지
    facingUp = false,
    hoverable = false, // <- 안 쓰는게 나을지도?
    origin = ['50%', '50%'],
    cardID,
    ...data
  } = {}) {
    super({ origin, ...data });
    this.facingUp = facingUp;
    this.addClass('card-wrapper');

    this.inner = new GameObject();
    this.inner.addClass('card-inner');
    this.inner.attachToObject(this);
    this.front = new ImageObject();
    this.front.addClass('card-common');
    this.front.attachToObject(this.inner);
    const Back = new ImageObject();
    Back.setImagePath(backImage);
    Back.attachToObject(this.inner);
    Back.addClass('card-common');
    Back.addClass('card-back');

    this.setImagePath = this.front.setImagePath.bind(this.front);
    this.setImagePath(imagePath);
    this.inner.instance.style.transform = getFacingStyle(facingUp);
    this.cardID = cardID;
    this.hoverMoveUpCallback = null;
    this.hoverMoveDownCallback = null;
  }

  setWidth(width = 240) {
    this.instance.style.width = `${width}px`;
    this.instance.style.height = `${width * 1.5}px`;
  }

  addClickHandler(clickHandler) {
    this.instance.addEventListener('click', clickHandler);
  }

  animateFlip(duration = 500, toUp = !this.facingUp) {
    const current = getFacingStyle(this.facingUp);
    const next = getFacingStyle(toUp);
    if (duration > 0 && this.facingUp !== toUp) {
      const keyframes = [{ transform: current }, { transform: next }];
      const options = {
        duration,
        easing: 'ease',
      };
      this.inner.instance.animate(keyframes, options);
    }
    this.facingUp = !this.facingUp;
    this.inner.instance.style.transform = next;
  }

  moveUpCallback() {
    [this.fixedX, this.fixedY] = this.position;
    return () => {
      const movedX = this.fixedX + Math.sin(deg2rad(this.angle)) * MOVE_PERCENT;
      const movedY = this.fixedY - Math.cos(deg2rad(this.angle)) * MOVE_PERCENT;
      this.setDepth('7');
      this.move(movedX, movedY);
    };
  }

  moveDownCallback() {
    [this.fixedX, this.fixedY] = this.position;
    return () => {
      this.setDepth(null);
      this.move(this.fixedX, this.fixedY);
    };
  }

  setAnimateMove() {
    this.hoverMoveUpCallback = this.moveUpCallback();
    this.hoverMoveDownCallback = this.moveDownCallback();

    this.instance.addEventListener('mouseover', this.hoverMoveUpCallback);
    this.instance.addEventListener('mouseleave', this.hoverMoveDownCallback);
  }

  deleteAnimateMove() {
    this.instance.removeEventListener('mouseover', this.hoverMoveUpCallback);
    this.instance.removeEventListener('mouseleave', this.hoverMoveDownCallback);
  }
};

export default CardObject;
