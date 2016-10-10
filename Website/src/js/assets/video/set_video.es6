/* Set video module */
let config = require('configurations/video');
module.exports = class SetVideo {
  constructor(selector, source) {
    this.config = config;
    this.video = document.querySelector(selector);
    this.source = source;

    this.video.addEventListener('timeupdate', event => this.fullSize(event));
    this.video.addEventListener('ended', event => this.finish(event));
    this.self = this;
  }
  play() {
    let hide_list = document.querySelectorAll('.preloader');
    let hide_list_length = hide_list.length;
    for (var i = hide_list_length; i > 0; i--) {
      hide_list[i-1].remove();
    }
    this.video.classList.add('show');
    this.video.src = this.source;
    this.video.play();
  }
  fullSize(event) {
    let current_time = this.video.currentTime;
    if(current_time >= this.config.timing.full_size) {
      this.video.classList.add('full');
    }
  }
  finish() {
    document.dispatchEvent(new CustomEvent('video_finished', {detail: this.self}));
  }
  hide() {
    this.video.classList.remove('show');
  }
};