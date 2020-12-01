import TextObject from '@engine/TextObject';

const SomeNextScene = class {
  render({ root } = {}) {
    const text = new TextObject();
    text.attachToRoot();
    text.addClass('waiting-text-all-ready');
    text.setContent('하하');
  }

  wrapup() {}
};

export default SomeNextScene;
