/* Logo animation module */
let config = require('configurations/animation');
let SquareAnimation = require('square_animation');
module.exports = class LogoAnimation {
  constructor(elements, border, square, options = {}) {
    this.config = config;
    this.elements = elements;
    this.border = border;
    this.square = square;
    this.SquareAnimation = SquareAnimation;
    this.squareAnimation = new SquareAnimation(this.square);

    this.interval_timeout = this.config.logo.interval_timeout;
    this.square_timeout = this.config.logo.square_timeout;
    this.counter = 0;
    this.steps = this.elements.length;
    this.interval = null;

    document.addEventListener('start_video', this.destroy.bind(this));
  }
  animate() {
    this.interval = setInterval(this.update.bind(this), this.interval_timeout);
  }
  animateSquare() {
    this.squareAnimation.animate()
  }
  setSquare() {
    this.interval = setInterval(this.animateSquare.bind(this), this.square_timeout);
  }
  setBorder() {
    clearInterval(this.interval);
    this.border.classList.add('show');
    this.animateSquare();
    this.setSquare();
  }
  update() {
    if(this.counter == this.steps) {
      this.setBorder();
    }
    else {
      let item = this.elements[this.counter];
      item.classList.add('show');
    }
    this.counter++;
  }
  destroy() {
    clearInterval(this.interval);
  }
};