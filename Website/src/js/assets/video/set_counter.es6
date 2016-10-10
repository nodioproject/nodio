/* Set counter module */
let Counter = require('../utilities/counter');
module.exports = class SetCounter {
  constructor(element, event_name, options = {}) {
    this.Counter = Counter;
    this.counter = new Counter(element, options);
    document.addEventListener(event_name, event => this.update(event));
  }
  start() {
    this.counter.start();
  }
  update(event) {
    let percent = Math.floor((event.detail.loaded / event.detail.total) * 100);
    this.counter.count = percent;
  }
  get (property) {
    let result = this.counter[property];
    return this.counter[property];
  }
}