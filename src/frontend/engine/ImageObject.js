import GameObject from './GameObject';

const ImageObject = class extends GameObject {
  constructor(data) {
    const { imagePath } = data;
    super(data);
    this.imagePath = imagePath;
  }
};

export default ImageObject;
