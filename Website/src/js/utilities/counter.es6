module.exports = class Counter {
  constructor(element, options, count) {
    this.settings = {
      prefix: false,        // Use prefix
      suffix: false,        // Use suffix
      initial_value: 0,     // Initial value 
      max_value: 100,       // Maximum value
      animation_time: 0,   // Interval timeout in milliseconds
      callback: null        // Callback function
    };
    Object.assign(this.settings, options);
    this.interval = null;
    this.element = element;
    this.prefix = this.settings.prefix || '';
    this.suffix = this.settings.suffix || '';
    this.value = this.settings.initial_value;
    this.max_value = this.settings.max_value;
    this.count = count || this.value;
    this.callback = this.settings.callback;
  }
  set (property, value) {
    return this[property] = value;
  }
  get (property) {
    return this[property];
  }
  counter() {
    let inequality = this.count - this.value;
    let direction = inequality / inequality;
    if(inequality) {
      this.value += direction;
      this.element.textContent = this.prefix + this.value + this.suffix;
    }
    if(this.value >= this.max_value) {
      clearInterval(this.interval);
      if(this.settings.callback) {
        this.settings.callback();
      }
    }
  }
  start() {
    this.interval = setInterval(this.counter.bind(this), this.settings.animation_time);
  }
}