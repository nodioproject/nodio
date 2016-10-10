/* Square animation module */
let config = require('configurations/animation');
module.exports = class SquareAnimation {
  constructor(target) {
    this.config = config;
    this.speed = this.config.square.speed;
    this.border_percent = this.config.square.border_percent;
    this.start_timestamp = 0;
    this.duration = 0;
    this.target = target;
    this.default_width = this.target.clientWidth;
  }
  animate() {
    this.start_timestamp = Date.now();
    requestAnimationFrame(this.update.bind(this));
  }
  update() {
    let screen_width = window.innerWidth;
    let screen_height = window.innerHeight;
    let base_size = Math.max(screen_width, screen_height);
    this.duration = (base_size - this.default_width) / this.speed * 1000;
    let timestamp = Date.now();
    let position = (timestamp - this.start_timestamp) / this.duration;
    let size = Math.round(position * (base_size / Math.sqrt(2)));
    let border = Math.ceil(size / (100 / this.border_percent)); 
    let opacity = (1 - position).toFixed(3);
    if(size > parseInt(this.default_width)) {
      this.target.style.width = size + 'px';
      this.target.style.height = size + 'px';
      this.target.style.borderWidth = border + 'px';
      this.target.style.opacity = opacity;
    }
    if(position <= 1) {
      requestAnimationFrame(this.update.bind(this));
    }
    else {
      this.target.style.width = this.default_width;
      this.target.style.height = this.default_width;
      this.target.style.borderWidth = 0;
      this.target.style.opacity = 0;
    }
  }
}