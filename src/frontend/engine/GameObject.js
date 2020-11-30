import { $create, $id } from '@utils/dom';

// https://easings.net/#easeInOutCubic
const easeOutCubic = (x) => 1 - (1 - x) ** 4;
const replacePercent = (str) => Number.parseFloat(str.replace('%', ''));

const GameObject = class {
  constructor({
    origin = null,
    position = null,
    parent = null,
    depth = 'auto',
    classes = [],
  } = {}) {
    this.createElement();
    this.animationFrame = null;
    this.originStyle = '';
    this.rotateStyle = '';

    this.setDepth(depth);
    if (origin) this.setOrigin(...origin);
    if (position) this.move(...position, 0);
    if (parent) this.attachToObject(parent);
    classes.forEach((className) => {
      this.setClass(className);
    });
  }

  attachToObject(parentObject) {
    if (parentObject) parentObject.appendChild(this);
    else this.attachToRoot();
  }

  attachToRoot() {
    $id('root').appendChild(this.instance);
  }

  createElement() {
    const element = $create('div');
    this.setElement(element);
  }

  appendChild(object) {
    this.instance.appendChild(object.instance);
    // this.childList = [...this.childList, object];
  }

  setClass(className) {
    this.instance.classList.add(className);
  }

  toggleClass(className) {
    this.instance.classList.toggle(className);
  }

  setElement(element) {
    this.instance = element;
  }

  setOriginCenter() {
    this.setOrigin();
  }

  setOrigin(x = '50%', y = '50%') {
    const numberY = replacePercent(y);
    const numberX = replacePercent(x);
    this.originStyle = `translate(-${x}, -${y})`;
    this.instance.style.transformOrigin = `${50 - numberX}% ${50 - numberY}%`;
    this.transform();
  }

  transform() {
    this.instance.style.transform = `${this.rotateStyle} ${this.originStyle}`;
  }

  setDepth(zIndex) {
    this.instance.style.zIndex = zIndex;
  }

  move(x = '0%', y = '0%', duration = 0.5) {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    if (!x && !y) {
      this.instance.style.removeProperty('top');
      this.instance.style.removeProperty('left');
    }
    if (duration === 0) {
      this.instance.style.top = y;
      this.instance.style.left = x;
      return;
    }
    const initialY = replacePercent(this.instance.style.top) || 0;
    const initialX = replacePercent(this.instance.style.left) || 0;
    const targetY = replacePercent(y);
    const targetX = replacePercent(x);

    const miliseconds = duration * 1000;
    let start = null;
    const animateFunction = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      if (elapsed > miliseconds) {
        this.instance.style.top = y;
        this.instance.style.left = x;
        this.animationFrame = null;
        return;
      }
      const newY =
        initialY + (targetY - initialY) * easeOutCubic(elapsed / miliseconds);
      const newX =
        initialX + (targetX - initialX) * easeOutCubic(elapsed / miliseconds);

      this.instance.style.top = `${newY}%`;
      this.instance.style.left = `${newX}%`;

      requestAnimationFrame(animateFunction);
    };

    this.animationFrame = requestAnimationFrame(animateFunction);
  }

  rotate(angle = '0deg', duration = 0.2) {
    const keyframes = [
      { transform: this.instance.style.transform },
      { transform: `rotateZ(${angle}) ${this.originStyle}` },
    ];
    const options = {
      duration: duration * 1000,
      easing: 'ease',
    };
    this.instance.animate(keyframes, options);

    this.instance.style.transform = `rotateZ(${angle}) ${this.originStyle}`;
    this.rotateStyle = `rotateZ(${angle})`;
  }
};

export default GameObject;
