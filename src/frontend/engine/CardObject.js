import backImage from '@resources/back.png';
import GameObject from './GameObject';
import ImageObject from './ImageObject';

const getFacingStyle = (isUp) => (isUp ? 'rotateY(0deg)' : 'rotateY(180deg)');

const CardObject = class extends GameObject {
  constructor({
    imagePath = backImage, // default: 뒷면 이미지
    facingUp = true,
    hoverable = false,
    origin = ['50%', '50%'],
    ...data
  } = {}) {
    super({ origin, ...data });
    this.facingUp = facingUp;
    this.setClass('card-wrapper');

    this.inner = new GameObject();
    this.inner.setClass('card-inner');
    this.inner.attachToObject(this);
    this.front = new ImageObject();
    this.front.setClass('card-common');
    this.front.attachToObject(this.inner);
    const Back = new ImageObject();
    Back.setImagePath(backImage);
    Back.attachToObject(this.inner);
    Back.setClass('card-common');
    Back.setClass('card-back');

    this.setImagePath = this.front.setImagePath.bind(this.front);
    this.setImagePath(imagePath);
    this.inner.instance.style.transform = getFacingStyle(facingUp);
  }

  animateFlip(duration = 0.5, toUp = !this.facingUp) {
    const current = getFacingStyle(this.facingUp);
    const next = getFacingStyle(toUp);
    if (duration > 0 && this.facingUp !== toUp) {
      const keyframes = [{ transform: current }, { transform: next }];
      const options = {
        duration: duration * 1000,
        easing: 'ease',
      };
      this.inner.instance.animate(keyframes, options);
    }
    this.facingUp = !this.facingUp;
    this.inner.instance.style.transform = next;
  }
};

export default CardObject;
