/* Pagination module */
module.exports = class Pagination {
  constructor() {
    this.default_slide = 0;
    this.slide = this.default_slide;

    this.pagination = document.querySelector('#pagination');
    this.links = document.querySelectorAll('.pagination-item');
    this.links_length = this.links.length;

    for(let i = this.links_length - 1; i >= 0; i--) {
      this.links[i].addEventListener('click', this.selectItemHandler.bind(this), false);
    }
    document.addEventListener('set_navigation', this.selectItemAction.bind(this));
  }

  showPagination() {
    this.pagination.classList.add('show');
  }
  hidePagination() {
    this.pagination.classList.remove('show');
  }
  setItem(page) {
    for(let i = this.links_length - 1; i >= 0; i--) {
      let href = this.links[i].getAttribute('href');
      if(page == href) {     
        this.links[i].classList.add('active');
      }
      else {
        this.links[i].classList.remove('active');
      }
    }
  }
  selectItemHandler(event) {
    event.preventDefault();
    let item = event.currentTarget;
    if(item.classList.contains('active')) {
      return false;
    }
    let page = item.getAttribute('href');
    this.setItem(page);
    let event_detail = {
      detail: {
        page: page,
        source: 'pagination'
      }
    };
    document.dispatchEvent(new CustomEvent('change_page', event_detail));
  }
  selectItemAction(event) {
    this.pagination.classList.add('fast');
    let page = event.detail.page;
    if(page.split('-')[0] !== '#product') {
      this.hidePagination();
      return false;
    }
    let slide = event.detail.slide;
    if(page == '#product') {
      if(slide < 2) {
        this.hidePagination();
      }
      else {
        this.pagination.classList.remove('fast');
        this.showPagination();
      }
    }
    else {
      this.showPagination();
    }
    this.setItem(page);
  }
}