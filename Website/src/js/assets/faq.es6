/* Modal module */
module.exports = class Faq {
  constructor() {
    this.links = document.querySelectorAll('.clicker');
    this.links_length = this.links.length;
    for(let i = this.links_length - 1; i >= 0; i--) {
      this.links[i].addEventListener('click', this.toggleItem.bind(this), false);
    }
  }
  toggleItem(event) {
    event.preventDefault();
    for(let i = this.links_length - 1; i >= 0; i--) {
      let current = event.target.closest('.faq-block');
      let block = this.links[i].closest('.faq-block');
      if(current == block) {
        block.classList.toggle('open');
      }
      else {
        block.classList.remove('open');
      }
    }
  }
}