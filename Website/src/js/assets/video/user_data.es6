/***** User data module *****/
let config = require('../configurations/user_data');
let testUserData = require('../tests/test_user_data');
let testIP = require('../tests/test_ip');
let MobileDetect = require('../lib/mobile_detect');
let testBrowser = require('../tests/test_browser');
module.exports = class UserData {
  constructor(element, event_name, options = {}) {
    this.config = config;
    this.ready_counter = 0;

    this.location = this.config.default_value;
    this.provider = this.config.default_value;
    this.global_ip = this.config.default_value;
    this.testUserData = testUserData;
    this.getUserData();

    this.local_ip = this.config.default_value;
    this.testIP = testIP;
    this.getUserIP();

    this.MobileDetect = new MobileDetect(navigator.userAgent);

    this.device = this.getUserDevice();

    this.os = this.MobileDetect.os();

    this.browser_data = testBrowser();
    this.browser = this.browser_data.name + ' ' + this.browser_data.full_version;
  }
  set (property, value) {
    return this[property] = value;
  }
  get (property) {
    return this[property];
  }
  checkData() {
    this.ready_counter++;
    if(this.ready_counter == 2) {
      let data = {
        detail: {
          location: this.location,
          provider: this.provider,
          global_ip: this.global_ip,
          local_ip: this.local_ip,
          device: this.device,
          os: this.os,
          browser: this.browser
        }
      };
      document.dispatchEvent(new CustomEvent('user_data_ready', data));
    } 
  }
  errorHandler(error) {
    this.checkData();
    throw new Error('Error: ' + error + '!');
  }
  setUserData(data) {
    this.location = data.city + ', ' + data.country;
    this.provider = data.isp;
    this.global_ip = data.query;
    this.checkData();
  }
  getUserData() {
    this.testUserData().catch(this.errorHandler).then(data => this.setUserData(data));
  }
  setUserIP(data) {
    this.local_ip = data;
    this.checkData();
  }
  getUserIP() {
    this.testIP().catch(this.errorHandler).then(data => this.setUserIP(data));
  }
  getUserDevice() {
    let part = navigator.userAgent.split(' Build/');
    let nav_device = part[0].substr(part[0].lastIndexOf(';') + 2);
    if(nav_device.length > 15) {
      nav_device = false;
    }
    return nav_device || this.MobileDetect.mobile() || this.config.default_device;
  }
}