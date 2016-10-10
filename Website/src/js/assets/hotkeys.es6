/* Hotkeys module */
module.exports = class Hotkeys {
  constructor() {
    document.addEventListener('keyup', this.keyupHandler.bind(this));
  }
  keyupHandler(event) {
    if(event.target.tagName == 'INPUT' || event.target.tagName == 'TEXTAREA') {
      return false;
    }
    let key = event.which || event.keyCode;
    let event_name = false;
    let event_detail = {};
    switch(key) {
      case 27:
        if(!document.querySelector('#modal.show')) {
          return false;
        }
        event_name = 'close_modal';
        break;
      case 38:
        event_name = 'change_page_key';
        event_detail.direction = 1;
        break;
      case 40:
        event_name = 'change_page_key';
        event_detail.direction = -1;
        break;
    }
    if(event_name) {
      document.dispatchEvent(new CustomEvent(event_name, {detail: event_detail}));
    }
  }
}