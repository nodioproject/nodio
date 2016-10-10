/*** Video config ***/
let video = {
  folder: 'media',
  types: {
    mp4: {
      type: 'video/mp4; codecs="avc1.640029, mp4a.40.2"'
    }
  },
  sizes: {
    // nodio_800x450: {
    //   width: 800,
    //   height: 450,
    // },
    nodio_1920x1080: {
      width: 1920,
      height: 1080,
    }
  },
  timing: {
    full_size: 2.7
  }
};

module.exports = video;