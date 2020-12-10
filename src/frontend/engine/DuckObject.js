import { Duck, DuckHat } from '@utils/duck';
import GameObject from './GameObject';

class DuckObject extends GameObject {
  constructor({ color = '#555', width = 100, ...rest } = {}) {
    super(rest);
    this.color = color;
    this.width = width;
    this.hat = false;
    this.render();
  }

  setColor(color) {
    this.color = color;
    this.render();
  }

  setHat(boolean) {
    const hatElement = this.getChildrenNode('.duck-hat');
    const display = boolean ? 'block' : 'none';
    hatElement.style.display = display;
  }

  generateDuckHTML() {
    const { color, width } = this;
    return `
      <div>
        ${DuckHat({ width: (width / 11) * 9 })}
        ${Duck({ color, width })}
      </div>
    `;
  }

  getChildrenNode(className) {
    const { instance } = this;
    return instance.querySelector(className);
  }

  render() {
    const duckHTML = this.generateDuckHTML();
    this.setInnerHTML(duckHTML);
  }
}

export default DuckObject;
