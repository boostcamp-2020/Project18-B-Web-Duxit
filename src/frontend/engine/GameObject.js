import { $create, $id } from '@utils/dom';

const GameObject = class {
  constructor(data = {}) {
    const { id, name, position, depth, size, cssClass } = data;
    this.id = id;
    this.name = name;
    this.position = position;
    this.depth = depth;
    this.size = size;
    this.origin = { x: 0, y: 0 };
    this.cssClass = cssClass;
    this.createElement();
  }

  attachToObject(parentObject) {
    if (parentObject) parentObject.appendChild(this);
    else this.attachToRoot();
  }

  delete(duration = 1) {
    this.instance.style.transition = `opacity ${duration}s`;
    this.instance.style.opacity = 0;
    setTimeout(() => this.instance.remove(), duration * 1000);
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

  addClass(className) {
    this.instance.classList.add(className);
  }

  toggleClass(className) {
    this.instance.classList.toggle(className);
  }

  removeClass(className) {
    this.instance.classList.remove(className);
  }

  setElement(element) {
    this.instance = element;
  }

  setOriginCenter() {
    this.origin = { x: this.size.width / 2, y: this.size.height / 2 };
  }

  setOrigin(x, y) {
    this.origin = { x, y };
  }

  rotate(angle) {
    this.angle = angle;
  }
};

export default GameObject;
