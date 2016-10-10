/* Upload video module */
let Uploader = require('../utilities/uploader');
module.exports = class VideoUrl {
  constructor() {
    this.Uploader = Uploader;
    this.uploader_options = {
      progressHandler: this.progressHandler,
      readystatechangeHandler: this.readystatechangeHandler,
      loadHandler: this.loadHandler
    }
    this.uploader = new Uploader(this.uploader_options);
  }
  upload(url) {
    this.uploader.upload(url);
  }
  progressHandler(event) {
    let data = {
      detail: event
    }
    document.dispatchEvent(new CustomEvent('upload_progress', data));
  }
  readystatechangeHandler(event) {
    if(event.target.readyState == 4) {
      if(event.target.status == 200) {
        document.dispatchEvent(new CustomEvent('upload_complete'));
      }
      else {
        throw new Error('Upload crashed with status ' + event.target.status + '!');
      }
    }
  }
  loadHandler(event) {
    let source = URL.createObjectURL(event.target.response)
    document.dispatchEvent(new CustomEvent('video_source', {detail: source}));
  }
}