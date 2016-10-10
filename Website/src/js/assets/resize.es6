/* Resize module */
module.exports = class Router {
  constructor() {
    this.cell_size = 60;
    this.left_delta = 1;
    this.container = document.querySelector('.container');
    this.navigation_content = document.querySelector('.navigation-content');
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler.bind(this));
  }
  resizeHandler() {
    this.widthHandler();
    this.heightHandler();
  }
  heightHandler() {
    let window_height = window.innerHeight;
    // let container_height = this.container.clientHeight;
    // let bottom = '0px';
    // if(window_height > container_height) {
    //   bottom = window_height % this.cell_size + 'px';
    // }
    // this.container.style.paddingBottom = bottom;
    let height = ''
    if(window_height > 720) {
      Math.floor(window_height / (2 * this.cell_size)) * (2 * this.cell_size) + 'px';
    }
    this.container.style.height = height + 'px';
  }
  widthHandler() {
    let window_width = window.innerWidth;
    let width = Math.floor(window_width / (2 * this.cell_size)) * (2 * this.cell_size) + 1;
    if(window_width > 1019 && window_width < 1080) {
      width += 60;
    }
    this.container.style.width = width + 'px';
    this.navigation_content.style.width = width + 'px';
    // if(1020 >= window_width) {
      // this.container.style.boxSizing = 'border-box';
      // this.container.style.paddingLeft = '30px';
      // this.container.style.paddingRight = '30px';
    //   let width = Math.floor(window_width / (this.cell_size * 2)) * 2 * this.cell_size + 1 + 'px';
    //   this.container.style.width = width;
    //   this.navigation_content.style.width = width;
    // }
    // else {
      // if(1080 >= window_width) {
      //   this.container.style.boxSizing = 'border-box';
      //   this.navigation_content.style.width = 'none'
      //   this.container.style.width = '1020px'
        // this.container.style.paddingLeft = '179px';
        // this.container.style.paddingRight = 0;
      // }
      // else {
      //   this.navigation_content.style.width = 'none'
      //   this.container.style.width = '1080px'
      //   this.container.style.paddingLeft = '179px';
      // }
      // else {
      //   this.container.style.boxSizing = 'content-box';
      //   this.container.style.width = Math.floor(window_width / (this.cell_size * 2)) * 2 * this.cell_size + 1 + 'px';
      //   this.container.style.width = '841px'
      //   this.navigation_content.style.width = 'none'
      //   let window_cells = Math.floor(window_width / this.cell_size);
      //   let container_width = this.container.clientWidth;
      //   let container_style = this.container.currentStyle || window.getComputedStyle(this.container, false);

      //   let container_left = parseInt(container_style.paddingLeft) || 0;
      //   let container_right = parseInt(container_style.paddingRight) || 0;
      //   let container_inner_width = container_width - container_left - container_right;
      //   let container_cells = Math.floor(container_inner_width / this.cell_size);
      //   let free_cells = window_cells - container_cells;
      //   let left = 2;
      //   let right = 1;
      //   free_cells = free_cells - left - right;
      //   if(free_cells > 0) {
      //     right = 2;
      //     free_cells--;
      //   }
      //   free_cells = Math.floor(free_cells / 2);
      //   for(let i = free_cells - 1; i >= 0; i--) {
      //     left++;
      //     right++;
      //   }
      //   left = (left * this.cell_size) - this.left_delta + 'px';
      //   right = (right * this.cell_size) + 'px';
      //   if(left !== container_left) {
      //     this.container.style.paddingLeft = left;
      //   }
      //   if(right !== container_right) {
      //     this.container.style.paddingRight = right;
      //   }
      // }
    // }
  }
}