/* Audio module */
let Storage = require('../utilities/storage');
module.exports = class Audio {
  constructor() {
    this.animation_time = 1000;
    this.counter = 0;
    this.interval = null;
    this.visuzlization_animation_time = 150;
    this.visuzlization_intervals = [];
    this.audio = document.querySelector('#audio');
    this.support = this.checkSupport();
    if(this.support) {
      return false;
    }
    this.switcher = document.querySelector('.audio_switcher');
    this.visuzlization_bars = document.querySelectorAll('.vizualizer-bar');
    this.Storage = Storage;
    this.storage = new Storage();
    this.mute = this.storage.getItem('mute') == 'true';
    this.setAudio(this.mute);
    this.switcher.addEventListener('click', this.toggle.bind(this), false);
  }
  checkSupport() {
    return typeof this.audio.canPlayType == 'undefined';
  }
  on() {
    this.switcher.classList.remove('muted');
    this.mute = false;
    this.storage.setItem('mute', this.mute);
    this.fx();
  }
  off() {
    this.switcher.classList.add('muted');
    this.mute = true;
    this.storage.setItem('mute', this.mute);
    this.fx();
  }
  animate() {
    if(!this.mute) {
      for(let i = this.visuzlization_bars.length - 1; i >= 0; i--) {
        let bar = this.visuzlization_bars[i];
        let item = setInterval(function () {
            var rand = Math.floor(Math.random() * (80 - 10 + 1)) + 10;
            bar.style.height = rand + "%";
        }, this.visuzlization_animation_time);
        this.visuzlization_intervals.push(item);
      }
    }
    else {
      for(let i = this.visuzlization_intervals.length - 1; i >= 0; i--) {
        clearInterval(this.visuzlization_intervals[i]);
      }
    }
  }
  set_Volume() {
    if(this.counter == 0) {
      if(!this.mute) {
        this.audio.play();
        this.animate();
      }
    }
    if(this.counter == 100) {
      this.counter = 0;
      clearInterval(this.interval);
      this.audio.volume = 1 - this.mute;
      if(this.mute) {
        this.audio.pause();
        this.animate();
      }
      return;
    }
    let new_volume = Math.abs(this.mute - (this.counter / 100)).toFixed(2);
    if((audio.volume < new_volume && !this.mute) || (audio.volume > new_volume && this.mute)) {
      this.audio.volume = new_volume;
    }
    this.counter++;
  }
  fx() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {this.set_Volume()}, this.animation_time / 100);
  }
  setAudio(mute) {
    if(mute) {
      this.off();
    }
    else {
      this.on();
    }
  }
  toggle() {
    let mute = this.storage.getItem('mute') == 'true';
    let new_value = !mute;
    this.setAudio(new_value);
  }
}