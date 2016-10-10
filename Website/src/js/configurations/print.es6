/***** Print config *****/
let config = {};
config.frame_timeout = 30; 
config.printer_settings = {
  info: {
    print_all: true,
    frame_timeout: config.frame_timeout,
    placeholder_frames: 9,
    opacity_frames: 16,
  },
  info_percent: {
    print_all: true,
    frame_timeout: config.frame_timeout,
    placeholder_frames: 9,
    opacity_frames: 7,
  },
  header_all: {
    print_all: true,
    frame_timeout: config.frame_timeout,
    placeholder_frames: 5,
    opacity_frames: 10,
  },
  header_string: {
    placeholder_frames: 1,
    frame_timeout: config.frame_timeout,
  },
  footer_top: {
    print_all: true,
    frame_timeout: config.frame_timeout,
    placeholder_frames: 12,
    opacity_frames: 7,
  },
  footer_bottom: {
    print_all: true,
    frame_timeout: config.frame_timeout,
    placeholder_frames: 12,
    opacity_frames: 16,
    max_opacity: 0.75,
  }
};


config.term_delay = 30;
config.describe_delay = 30;
config.printer_queue_defaults = {
  frames_delay: 10,
};
config.printer_queue_options = {
  1: {
    frames_delay: 0,
    before: false,
    after: 'setCounter',
  },
  2: {
    frames_delay: config.term_delay,
    before: [
      'checkPercent',
      'checkHeigth',
      'checkUserData'
    ],
    after: false,
    percent: 10
  },
  3: {
    frames_delay: config.describe_delay,
    before: false,
    after: false
  },
  4: {
    frames_delay: config.term_delay,
    before: [
      'checkPercent',
      'checkHeigth',
    ],
    after: false,
    percent: 25
  },
  5: {
    frames_delay: config.describe_delay,
    before: false,
    after: false
  },
  6: {
    frames_delay: config.term_delay,
    before: [
      'checkPercent',
      'checkHeigth',
    ],
    after: false,
    percent: 40
  },
  7: {
    frames_delay: config.describe_delay,
    before: false,
    after: false
  },
  8: {
    frames_delay: config.term_delay,
    before: [
      'checkPercent',
      'checkHeigth',
    ],
    after: false,
    percent: 55
  },
  9: {
    frames_delay: config.describe_delay,
    before: false,
    after: false
  },
  10: {
    frames_delay: config.term_delay,
    before: [
      'checkPercent',
      'checkHeigth',
    ],
    after: false,
    percent: 70
  },
  11: {
    frames_delay: config.describe_delay,
    before: false,
    after: false
  },
  12: {
    frames_delay: config.term_delay,
    before: [
      'checkPercent',
      'checkHeigth',
    ],
    after: false,
    percent: 85
  },
  13: {
    frames_delay: config.describe_delay,
    before: false,
    after: false
  },
  14: {
    frames_delay: config.term_delay,
    before: [
      'checkPercent',
      'checkHeigth',
    ],
    after: false,
    percent: 90
  },
  15: {
    frames_delay: config.describe_delay,
    before: false,
    after: false
  }
};
module.exports = config;