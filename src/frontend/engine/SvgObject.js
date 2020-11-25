import GameObject from './GameObject';

const SvgObject = class extends GameObject {
  setInnerHtml(svgText) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = svgText;
    this.instance = wrapper.firstChild;
  }
};

export default SvgObject;
