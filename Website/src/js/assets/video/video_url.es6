/* Get video url module */
let config = require('../configurations/video');
let TestMedia = require('../tests/test_media');
module.exports = class VideoUrl {
  constructor() {
    this.config = config;
    this.TestMedia = TestMedia;
  }
  get extention() {
    let testMedia = new this.TestMedia();
    let config = this.config.types;
    let types = Object.keys(config).map(function(index, value) {
      return config[index].type;
    });
    let supported_type = testMedia.getStrictSupported(types);
    if(!supported_type) {
      throw new Error('Supported video type not found!');
    }
    let index = testMedia.getStrictSupported(types).index;
    let extention = Object.keys(config)[index];
    return extention;
  }
  get name() {
    let sizes = this.config.sizes;
    let name = Object.keys(sizes);
    let screen_width = window.screen.availWidth;
    let screen_height = window.screen.availHeight;
    let sizes_length = Object.keys(sizes).length;
    for (var i = sizes_length; i > 0; i--) {
      let index = sizes_length - i;
      let size = sizes[Object.keys(sizes)[index]];
      if((size.width <= screen_width && size.height <= screen_height)) {
        name = Object.keys(sizes)[index];
      }
      else {
        return name;
      }
    }
    return name;
  }
  get url() {
    let folder = this.config.folder;
    let name = this.name;
    let extention = this.extention;
    let url = folder + '/' + name + '.' + extention;
    return url;
  }
}