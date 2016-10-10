/* Next module */
module.exports = class Next {
  constructor() {
    this.next_links = document.querySelectorAll('.next-link, .next-link-additional');
    this.next_links_length = this.next_links.length;
    for(let i = this.next_links_length - 1; i >= 0; i--) {
      this.next_links[i].addEventListener('click', ()=> {this.pageHandler(true);});
    }
    document.addEventListener('change_page_key', this.keyHandler.bind(this));
    window.addEventListener('scroll', this.scrollHandler());
    window.addEventListener('touchstart', (event)=> this.touchstartHandler(event));
    window.addEventListener('touchmove', (event)=> this.touchmoveHandler(event));
    this.setMousewheelHandler();
    this.ready_prev = true;
    this.ready_next = false;
    this.touch_start = null;
    this.move_distance = 50;
  }
  checkOpacity() {
    let next_link = document.querySelector('.page.show .next-link');
    if(next_link) {
      let next_link_style = next_link.currentStyle || window.getComputedStyle(next_link, false);
      let opacity = next_link_style.opacity;
      if(opacity < 0.9) {
        return false;
      }
    }
    return true;
  }
  pageHandler(direction = true) {
    if(!this.checkOpacity()) {
      return false;
    }
    let current = document.querySelector('.page.show');
    if(!current) {
      return false;
    }
    let next = false;
    if(current.id == 'product') {
      if(!direction) {
        return false;
      }
      next = current;
    }
    else {
      if(direction) {
        next = current.nextSibling;
      }
      else {
        next = current.previousSibling;
      }
    }
    if(next) {
      let page = '#' + next.id;
      let event_detail = {
        detail: {
          page: page,
          source: 'next'
        }
      };
      document.dispatchEvent(new CustomEvent('change_page', event_detail));
    }
  }
  setMousewheelHandler() {
    if(document.addEventListener) {
      if('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        document.addEventListener("wheel", this.mousewheelHandler.bind(this));
      }
      else if('onmousewheel' in document) {
        // устаревший вариант события
        document.addEventListener("mousewheel", this.mousewheelHandler.bind(this));
      }
      else {
        // Firefox < 17
        document.addEventListener("MozMousePixelScroll", this.mousewheelHandler.bind(this));
      }
    }
    else { // IE8-
      document.attachEvent("onmousewheel", this.mousewheelHandler.bind(this));
    }
  }
  mousewheelHandler(event) {
    this.scrollHandler();
    let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if(this.ready_prev || this.ready_next) {
      this.switchHandler(delta);
    }
  }
  keyHandler(event) {
    let direction = event.detail.direction;
    this.switchHandler(direction);
  }
  scrollHandler() {
    let scroll = document.querySelector('body > .gm-scroll-view');
    let scroll_position = window.pageYOffset || document.documentElement.scrollTop;
    if(!scroll) {
      scroll = document.querySelector('body');
    }
    else {
      scroll_position = scroll.scrollTop;
    }
    let scrollHeight = scroll.scrollHeight;
    let offsetHeight  = scroll.offsetHeight ;
    if(scroll_position == 0) {
      this.ready_prev = true;
    }
    else {
      this.ready_prev = false;
    }
    if(scroll_position + offsetHeight === scrollHeight) {
      this.ready_next = true;
    }
    else {
      this.ready_next = false;
    }
  }
  touchstartHandler(event) {
    if(this.ready_next || this.ready_prev) {
      this.touch_start = event.touches[0].pageY;
    }
    else {
      this.touch_start = null;
    }
  }
  touchmoveHandler(event) {
    if(this.touch_start && (this.ready_next || this.ready_prev)) {
      let move = this.touch_start - event.touches[0].pageY;
      if(-1 * move > this.move_distance && this.ready_prev) {
        this.pageHandler(false);
        this.touch_start = null;
        // this.ready_prev = false;
      }
      if(move > this.move_distance && this.ready_next) {
        this.pageHandler();
        this.touch_start = null;
        // this.ready_next = false;
      }
    }
  }
  switchHandler(direction) {
    let modal = document.querySelector('#modal.show');
    let current = document.querySelector('.page.show');
    if(modal || !current) {
      return false;
    }
    if(direction > 0 && this.ready_prev) {
      this.pageHandler(false);
    }
    if(direction < 0 && this.ready_next) {
      this.pageHandler();
    }
  }
}