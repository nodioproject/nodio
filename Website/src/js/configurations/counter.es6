/***** Counter config *****/
let counter = {
  selector: '.percent',
  options: {
    animation_time: 55,
    suffix: ' %',
    callback: function() {
      document.dispatchEvent(new CustomEvent('countdown'));
    }
  }
};

module.exports = counter;