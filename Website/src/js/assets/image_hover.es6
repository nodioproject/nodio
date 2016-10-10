/* Image hover module */
module.exports = class ImageHover {
  constructor(target, item) {
    this.target_selector = target;
    this.target = document.querySelector(this.target_selector);
    this.item = document.querySelector(item);
    this.element = this.target.getBoundingClientRect();
    this.width = this.element.width;
    this.height = this.element.height;

    this.canvas = document.createElement("CANVAS");
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context = this.canvas.getContext('2d');

    this.source = this.getImageSource();
    this.image = new Image();
    this.image.src = this.source;
    this.image.addEventListener('load', this.setImage.bind(this));

    document.addEventListener('mousemove', this.hoverHandler.bind(this));

    window.addEventListener('resize', this.resizeHandler.bind(this));
    this.timeout = null;
  }
  resizeHandler() {
    let resize = this.resize.bind(this);
    clearTimeout(this.timeout);
    this.timeout = null;
    this.timeout = setTimeout(resize, 250);
  }
  resize() {
    this.target = document.querySelector(this.target_selector);
    this.element = this.target.getBoundingClientRect();
    this.width = this.element.width;
    this.height = this.element.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.setImage();
  }
  setImage() {
    this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.width, this.height);
  }
  addHover() {
    this.item.classList.add('hover');
  }
  removeHover() {
    this.item.classList.remove('hover');
  }
  hoverHandler(event) {
    let coordinates = this.getCoordinates(event);
    if(coordinates) {
      let color = this.getColor(coordinates.x, coordinates.y);
      let opacity = color[3];
      if(opacity > 10) {
        this.addHover();
      }
      else {
        this.removeHover();
      }
    }
    else {
      this.removeHover();
    }
  }
  getCoordinates(event) {

    let x = event.clientX - this.element.left;
    if(x < 0 || x > this.width) {
      return false;
    }

    let y = event.clientY - this.element.top;
    if(y < 0 || y > this.height) {
      return false;
    }
    return {x: x, y: y};
  }
  getImageSource() {
    let style = this.target.currentStyle || window.getComputedStyle(this.target, false);
    let source = this.target.src || style.backgroundImage.slice(4, -1).replace(/"/g, "");
    return source
  }
  getColor(x, y) {
    return this.context.getImageData(x, y, 1, 1).data;
  }
}