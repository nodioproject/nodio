/* Logger module */
module.exports = class Logger {
  constructor() {
    this.logger_element = document.createElement("div");
    this.logger_element.className = 'logger';
    if(!console) {
      console = {};
    }
    this.default_log = console.log;
    this.default_error = console.error;
    this.default_warn = console.warn;
    this.default_info = console.info;
    console.log = (message)=> {
      this.default_log(message)
      this.log(message, 'log');
    }
    console.error = (message)=> {
      this.default_error(message)
      this.log(message, 'error');
    };
    console.warn = (message)=> {
      this.default_warn(message)
      this.log(message, 'warn');
    };
    console.info = (message)=> {
      this.default_info(message)
      this.log(message, 'info');
    };
    this.logger = document.querySelector('body').appendChild(this.logger_element);
  }
  print(text, type) {
    let string = document.createElement("div");
    string.className = type;
    string.textContent = text;
    this.logger_element.appendChild(string);
  }
  getText(data) {
    if(typeof data == 'object') {
      return JSON && JSON.stringify ? JSON.stringify(data) : String(data);
    }
    return data;
  };
  log(data, type) {
    let text = this.getText(data);
    this.print(text, type);
  }
}