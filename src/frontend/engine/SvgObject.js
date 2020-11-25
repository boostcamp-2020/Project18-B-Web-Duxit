import GameObject from './GameObject';

const SvgObject = class extends GameObject {
  setInnerHtml(svgText) {
    this.instance.innerHTML = svgText;
  }
};

export default SvgObject;
