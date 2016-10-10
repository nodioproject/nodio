/* Print module */
let config = require('configurations/print');
let printString = require('../utilities/print_string');
module.exports = class Preloader {
  constructor(selector, counter) {
    this.config = config;
    this.counter = counter;
    this.printString = printString;

    this.elements = document.querySelectorAll(selector);
    this.user_data_block = document.querySelector('#user-data-block');
    this.definitions_list = document.querySelectorAll('.definition');

    this.hide_definition = 0;
    this.steps_length = 0;
    this.steps = this.getSteps();
    this.new_step = false;
    this.step = 0;
    this.step_length = 0;
    this.before = [];
    this.before_length = 0;
    this.after = [];
    this.after_length = 0;
    this.step_counter = 0;
    this.user_data = false;
    this.pass_percent = true;
    this.finish = false;
    
    document.addEventListener('string_printed', event => this.print());
    document.addEventListener('user_data_ready', event => this.setUserData(event));
  }
  getSteps() {
    if(!this.elements.length) {
      throw new Error('Nothing to print!');
    }
    let result = {};
    for(let element of this.elements) {
      if(!result[element.getAttribute('data-print-step')]) {
        result[element.getAttribute('data-print-step')] = [];
        this.steps_length++;
      }
      result[element.getAttribute('data-print-step')].push(element);
    }
    return result;
  }
  getFunctions(type) {
    let functions = this.config.printer_queue_options[this.step][type];
    if(!functions) {
      return [];
    }
    if(functions.constructor !== Array) {
      functions = [functions];
    }
    return functions;
  }
  printStep() {
    for(let i = this.step_length; i > 0; i--) {
      let index = this.step_length - i;
      let settings = this.config.printer_settings[this.steps[this.step][index].getAttribute('data-print-setting')];
      let string = false;
      if(this.steps[this.step][index].getAttribute('data-print-string')) {
        string = this.user_data[this.steps[this.step][index].getAttribute('data-print-string')];
      }
      this.printString(this.steps[this.step][index], string, settings);
    }
  }
  print(step = false) {
    if(step) {
      this.step = step;
      this.new_step = true;
    }
    if(this.new_step) {
      this.step_length = this.steps[this.step].length;

      this.before = this.getFunctions('before');
      this.after = this.getFunctions('after');
      this.new_step = false;
    }
    this.before_length = this.before.length
    if(this.before_length) {
      let before_function = this.before.shift();
      this[before_function]();
      return;
    }
    if(!this.step_counter) {
      this.step_counter++;
      this.printStep();
    }
    if(this.step_counter == this.step_length) {
      this.after_length = this.after.length
      if(this.after_length) {
        let after_function = this.after.shift();
        this[after_function]();
        return;
      }
      this.step_counter = 0;
      if(this.step !== this.steps_length) {
        this.step++;
        this.new_step = true;
      }
      else {
        if(this.finish) {
          document.addEventListener('countdown', this.setVideo.bind(this));
        }
        this.step_counter++;
        this.finish = true;
        return;
      }
    }
    else {
      this.step_counter++;
      return;
    }
  }
  setUserData(data) {
    this.user_data = data.detail;
    document.removeEventListener('user_data_ready', event => this.setUserData(event));
  }
  checkUserData() {
    if(this.user_data) {
      this.print();
    }
    else {
      document.addEventListener('user_data_ready', this.print.bind(this));
    }
  }
  checkPercent() {
    let percent = this.config.printer_queue_options[this.step].percent
    if(!percent) {
      document.removeEventListener('upload_progress', event => this.checkPercent(event));
      return;
    }
    let current_percent = this.counter.counter.count;
    if(percent > current_percent) {
      if(this.pass_percent) {
        this.pass_percent = false;
        document.addEventListener('upload_progress', event => this.checkPercent(event));
      }
    }
    else {
      this.pass_percent = true;
      document.removeEventListener('upload_progress', event => this.checkPercent(event));
      this.print();
    }
  }
  setCounter() {
    this.counter.start();
    this.print();
  }
  checkHeigth() {
    let next_definition = this.definitions_list[(this.step - 2) / 2];
    if(!next_definition) {
      this.print();
      return;
    }
    let user_data_block_heigth = this.user_data_block.getBoundingClientRect().height;
    let next_definition_offset = next_definition.getBoundingClientRect().top - this.user_data_block.getBoundingClientRect().top + next_definition.getBoundingClientRect().height;
    let delta = next_definition_offset - user_data_block_heigth;
    if(delta > 0) {
      let margin_top = -1 * this.definitions_list[this.hide_definition].getBoundingClientRect().height + 'px';
      this.definitions_list[this.hide_definition].style.marginTop = margin_top;
      setTimeout(this.removeDefinition.bind(this), 300);
    }
    else {
      this.print();
    }
  }
  removeDefinition() {
    this.definitions_list[this.hide_definition].style.display = 'none';
    this.hide_definition++;
    this.print();
  }
  setVideo() {
    document.dispatchEvent(new CustomEvent('start_video'));
  }
};
