let video = require('configurations/video')
let config = {};
/*** Video config ***/
config.video = video;


/*** Set default user data ***/
config.default_data_value = 'unknown';
config.user_data = {
  global_ip:  config.default_data_value,
  local_ip:   config.default_data_value,
  provider:   config.default_data_value,
  location:   config.default_data_value,
  device:     config.default_data_value,
  os:         config.default_data_value,
  browser:    config.default_data_value,
};
config.statistic_animation_time = 55;

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
    frames_delay: 0
  },
  2: {
    frames_delay: config.term_delay,
    callback: 'checkUserDataHeigth'
  },
  3: {
    frames_delay: config.describe_delay
  },
  4: {
    frames_delay: config.term_delay,
    callback: 'checkUserDataHeigth'
  },
  5: {
    frames_delay: config.describe_delay
  },
  6: {
    frames_delay: config.term_delay,
    callback: 'checkUserDataHeigth'
  },
  7: {
    frames_delay: config.describe_delay
  },
  8: {
    frames_delay: config.term_delay,
    callback: 'checkUserDataHeigth'
  },
  9: {
    frames_delay: config.describe_delay
  },
  10: {
    frames_delay: config.term_delay,
    callback: 'checkUserDataHeigth'
  },
  11: {
    frames_delay: config.describe_delay
  },
  12: {
    frames_delay: config.term_delay,
    callback: 'checkUserDataHeigth'
  },
  13: {
    frames_delay: config.describe_delay
  },
  14: {
    frames_delay: config.term_delay,
    callback: 'checkUserDataHeigth'
  },
  15: {
    frames_delay: config.describe_delay
  },
  16: {
    frames_delay: config.term_delay,
    callback: 'checkUserDataHeigth'
  },
  17: {
    frames_delay: config.describe_delay
  },
};

module.exports = config;