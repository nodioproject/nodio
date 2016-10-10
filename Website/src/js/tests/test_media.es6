/***** Test media module *****/
module.exports = class Counter {
  constructor() {
    this.MediaSource = window.MediaSource || window.WebKitMediaSource;
  }
  getStrict(format) {
    return this.MediaSource.isTypeSupported(format);
  }
  getStrictSupported(formats) {
    let result = false;
    if(formats.constructor !== Array) {
      formats = [formats];
    }
    let formats_length = formats.length;
    for(let i = formats_length; i > 0; i--) {
      let index = formats_length - i;
      if(this.getStrict(formats[index])) {
        result = {
          format: formats[index],
          index: index
        };
        return result;
      }
    }
    return result;
  }
};
