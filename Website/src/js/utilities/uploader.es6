/* Uploader module */
module.exports = class Uploader {
  constructor(options) {
    this.settings = {
      type: 'GET',
      responseType: 'blob',
      timeout: 0,
      timeoutHandler: null,
      abortHandler: null,
      errorHandler: null,
      loadstartHandler: null,
      loadHandler: null,
      loadendHandler: null,
      progressHandler: null,
      readystatechangeHandler: null,
    };
    Object.assign(this.settings, options);
    this.request = new XMLHttpRequest();
    let config = this.settings;
    this.request.timeout = config.timeout;
    this.request.responseType = config.responseType;

    let errorHandler = config.errorHandler || this.errorHandler;
    this.request.onerror = errorHandler;
    this.request.ontimeout = config.timeoutHandler;
    this.request.onabort = config.abortHandler;
    this.request.onloadstart = config.loadstartHandler;
    this.request.onload = config.loadHandler;
    this.request.onloadend = config.loadendHandler;
    this.request.onprogress = config.progressHandler;
    this.request.onreadystatechange = config.readystatechangeHandler;
  }
  set (property, value) {
    return this[property] = value;
  }
  get (property) {
    return this[property];
  }
  errorHandler() {
    throw new Error('File upload error!');
  }
  upload(url) {
    let type = this.settings.type;
    this.request.open(type, url);
    this.request.send();
    return this.request;
  }
  abort() {
    this.request.abort();
  }
}