/* Header height module */
module.exports = class HeaderHeight {
  constructor(header, logo) {
    this.header = header;
    this.logo = logo;
    window.addEventListener('resize', event => this.setHeigth());
    this.setHeigth();
  }
  setHeigth() {
    let header_top = Math.ceil(this.header.getBoundingClientRect().top);
    let logo_top = Math.ceil(this.logo.getBoundingClientRect().top);
    let header_height = (logo_top - header_top) + 'px';
    this.header.style.height = header_height;
  }
}